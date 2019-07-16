<template>
  <div class="container-fluid bg-color create p-0 fixed-top">
    <div class="container">
      <div class="row">
        <div class="col col-12">
          <form @submit.prevent="addNewProduct">
            <h2>Add New Product</h2>
            <div class="form-group">
              <input
                type="text"
                placeholder="Product Name"
                class="form-control"
                v-model="productData.name"
                required
              />
            </div>
            <div class="form-group">
              <input
                type="text"
                placeholder="Product Description"
                class="form-control"
                v-model="productData.description"
                required
              />
            </div>
            <div class="form-group">
              <div class="custom-file">
                <input
                  type="file"
                  class="custom-file-input"
                  id="productImage"
                  accept="image/*"
                  @change="uploadProdImage"
                />
                <label
                  class="custom-file-label"
                  for="productImage"
                >{{fileName?fileName:'Choose Picture'}}</label>
              </div>
            </div>
            <div class="form-group">
              <input
                type="number"
                placeholder="Product Price"
                class="form-control"
                v-model="productData.price"
                @keyup="calculateDiscount()"
                required
              />
            </div>
            <div class="form-group">
              <input
                type="number"
                placeholder="Product Discount %"
                class="form-control"
                v-model="productData.discount"
                @keyup="calculateDiscount()"
                required
              />
            </div>
            <div class="form-group">
              <input
                type="number"
                placeholder="Product Discounted Price"
                class="form-control"
                v-model="productData.discountedPrice"
                @keyup="calculateDiscount()"
                required
                readonly
              />
            </div>
            <div class="form-group">
              <select
                class="form-control w-100"
                v-model="productData.groupId"
                @change="printLog(productData.groupId)"
              >
                <option value disabled>Select Category</option>
                <option
                  v-for="(cat, index) in shoppingList"
                  :key="index"
                  :value="cat.groupId"
                >{{cat.title}}</option>
              </select>
            </div>
            <div class="form-group">
              <input
                type="text"
                placeholder="Product Brand"
                class="form-control"
                v-model="productData.brand"
                required
              />
            </div>
            <div class="form-group d-flex align-items-center">
              <input
                type="checkbox"
                class="form-control"
                id="showOnLandingPage"
                name="showOnLandingPage"
                style="width: 3rem"
              />
              <label for="showOnLandingPage" class="d-block m-0">Show on Landing Page</label>
            </div>
            <button type="submit" class="btn btn-primary">Add</button>
            <button class="btn btn-outline-dark ml-3" @click="goBack">Cancel</button>
            <p
              :class="{'text-success': success.flag, 'text-danger': !success.flag}"
              v-if="success.flag > -1"
            >{{success.msg}}</p>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { IShoppingCategory } from '@/interface/ICategory';
import { mapGetters } from 'vuex';
import { firebaseStorage, globalEventBus } from '../../main';
import { IProduct, IProductList } from '../../interface/IProduct';

@Component({
  computed: mapGetters(['shoppingList', 'allProducts']),
})
export default class CreateCategory extends Vue {
  public allProducts!: IProduct[];
  public success = {
    flag: -1,
    msg: '',
  };
  public shoppingList!: IShoppingCategory[];
  public productData: IProduct = {
    name: 'Ducati DAYPACK 24 L Laptop Backpack',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem animi deleniti, aperiam cupiditate porro in aliquam? Maiores ipsum aliquid libero, dolore similique repellendus nemo id qui voluptatum deserunt ratione odit!',
    image: '',
    discount: 79,
    price: 2799,
    discountedPrice: 0,
    category: 'Laptop Backpack',
    brand: 'Ducati & Giordano',
    groupId: 0,
    showOnLandingPage: false,
    productId: 0,
  };
  public fileName: string = '';

  public created() {
    this.$store.dispatch('loadCategory');
    this.$store.dispatch('loadAllProducts');
  }
  public uploadProdImage(event: Event) {
    const formEl: HTMLInputElement = event.target as HTMLInputElement;
    console.log(formEl.files);
    if (formEl.files!.length > 0) {
      this.fileName = formEl.files![0].name;
      globalEventBus.$emit('loading', true, 'Uploading image..');
      const uploadTask = firebaseStorage
        .ref()
        .child('product-images/' + formEl.files![0].name)
        .put(formEl.files![0], { contentType: formEl.files![0].type });

      uploadTask.on('state_changed', null, null, () => {
        uploadTask.snapshot.ref
          .getDownloadURL()
          .then((res) => (this.productData.image = res));
        globalEventBus.$emit('loading', false);
      });
    }
  }
  public addNewProduct(event: Event) {
    console.log(this.productData);
    this.calculateDiscount();
    globalEventBus.$emit('loading', true, 'Adding product data..');
    try {
      this.productData.productId = this.allProducts.length;
      this.$store
        .dispatch('addNewProductToGroup', this.productData)
        .then(() => {
          globalEventBus.$emit('loading', false);
          globalEventBus.$on('addNewProductToGroup', (errObject: Object) => {
            if (errObject == null) {
              this.productData = {
                name: '',
                description: '',
                image: '',
                discount: 0,
                price: 0,
                discountedPrice: 0,
                category: '',
                brand: '',
                groupId: 0,
                showOnLandingPage: false,
                productId: 0,
              };
              this.fileName = '';
              this.showMsg(1, 'Product added successfully');
            } else {
              this.showMsg(0, 'Something went wrong...');
            }
          });
        });
    } catch (e) {
      console.log(e);
    }
  }
  public showMsg(flag: number, msg: string) {
    this.success = {
      flag,
      msg,
    };
    setTimeout(() => {
      this.success = {
        flag: -1,
        msg: '',
      };
    }, 3000);
  }
  public goBack() {
    this.$router.replace({ path: '/admin' });
  }
  public printLog(groupId: number) {
    const cat = this.shoppingList.filter((item) => item.groupId == groupId);
    console.log(cat[0].title);
    this.productData.category = cat[0].title;
  }
  public calculateDiscount() {
    const price = parseInt(this.productData.price + '');
    if (isNaN(price)) {
      return;
    }
    const discountPercent = parseFloat(this.productData.discount + '');
    if (isNaN(discountPercent) || discountPercent > 100) {
      return;
    }
    const dPrice: number = (price * (100 - discountPercent)) / 100;
    this.productData.discountedPrice = Math.floor(dPrice);
  }
}
</script>
<style lang="scss" scoped>
.create {
  width: 100%;
  height: 100vh;
  overflow-y: auto;
  form {
    max-width: 500px;
    margin: 0 auto;
    background-color: #fff;
    padding: 1rem;
    margin-top: 2rem;
  }
}
</style>
