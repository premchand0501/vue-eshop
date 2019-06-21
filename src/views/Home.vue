<template>
  <div class="home">
    <div class="container-fluid">
      <h1>Add Properties</h1>
      <div class="row">
        <div class="col col-6">
          <ul class="list-group">
            <li class="list-group-item">
              <select v-model="currentProperty.propName" class="form-control" @change="checkForColorOptions">
                <option value>Select Property</option>
                <option
                  v-for="(cprop, ind) in CSSPropertyList"
                  v-bind:key="ind"
                  v-bind:value="cprop"
                >{{cprop}}</option>
              </select>
              <div class="input-group">
                <input
                  type="text"
                  class="form-control"
                  v-model="currentProperty.propValue"
                >
                <div class="input-group-append" v-if="enableColorPicker">
                  <button class="btn btn-dark">
                    <img src="../assets/img/color-picker.svg" alt="change color" style="width: 1rem;filter: invert(1)">
                  </button>
                </div>
              </div>
            </li>
            <Button
              class="btn btn-primary mb-3 mt-3"
              v-if="currentProperty.propValue !== ''"
              @click="applyProperties"
            >Apply Property</Button>
            <template v-if="allCSSPropsToApply.length>0">
              <li
                class="list-group-item propTable"
                v-for="(prop, index) in allCSSPropsToApply"
                v-bind:key="index"
              >
                <span>
                  <span>{{prop.propName}}:</span>
                  <span>{{prop.propValue}}</span>
                </span>
                <div class="btn-group">
                  <Button class="btn btn-outline-dark" @click="deleteCSSProp(index)">Delete</Button>
                </div>
              </li>
            </template>
          </ul>
        </div>
        <div class="col col-6 elementCanvas" v-bind:class="[BgType]">
          <Button class="btn btn-light" v-bind:style="stylesToApply">
            <img src="../assets/logo.png" style="filter: grayscale(1) invert(1)">
            <span>Say Hi {{BgType}}</span>
          </Button>
          <div class="btn-group">
            <Button class="btn btn-light" @click="bgType = 'light'">Light Bg</Button>
            <Button class="btn btn-light" @click="bgType = 'dark'">Dark Bg</Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Button from "@/components/Button.vue";
import {CSSPropertyType} from '../interface/CSSPropertyType';

import { CSSPropertyList } from "@/assets/tson/CSSPropertyList";

@Component({
  components: {
    Button
  }
})
export default class Home extends Vue {
  private CSSPropertyList: string[] = [];
  private bgType: string = "dark";

  private allCSSPropsToApply: CSSPropertyType[] = [];
  private currentProperty: CSSPropertyType = {
    propName: "",
    propValue: ""
  };

  private styles: any = {};

  private enableColorPicker: boolean = false;

  get BgType(): string {
    return this.bgType;
  }
  get stylesToApply(): CSSPropertyType[]{
    return this.styles;
  }
  created() {
    this.CSSPropertyList = CSSPropertyList;
  }
  checkForColorOptions(){
    this.enableColorPicker = (/border|background|color/.test(this.currentProperty.propName));
  }
  applyProperties() {
    this.allCSSPropsToApply.push({...this.currentProperty});
    this.currentProperty.propName = "";
    this.currentProperty.propValue = "";
    this.applyOnElement();
  }
  applyOnElement(){
    if(this.allCSSPropsToApply.length>0){
      this.allCSSPropsToApply.forEach(prop=>{
        let key = "";
        let names: string[] = prop.propName.split("-");
        if(names.length>0){
          key += names.map((n, i)=>{
            if(i>0){
              return n[0].toUpperCase() + n.slice(1);
            }
            else{
              return n;
            }
          }).join("");
        }
        console.log(key);
        this.styles[key] = prop.propValue;
      });
    }
    else{
      this.styles = [];
    }
    this.$forceUpdate();
  }
  deleteCSSProp(index: number){
    this.allCSSPropsToApply.splice(index, 1);
    this.applyOnElement();
    console.log(JSON.stringify(this.styles), JSON.stringify(this.allCSSPropsToApply));
  }
}
</script>
<style lang="scss" scoped>
.list-group-item {
  border: none;
  padding: 1rem 0;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  > * {
    flex-basis: 50%;
    margin: 0;
  }
}
.elementCanvas {
  width: 100%;
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
  .btn-group {
    position: absolute;
    top: 0;
  }
}
.elementCanvas.dark {
  background-color: #222;
}
.elementCanvas.light {
  background-color: #fff;
}
.propTable{
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #ddd;
  flex-direction: row;
  >*{
    flex-basis: 100%;
    padding: 0 1rem;
  }
  >span{
    display: flex;
    justify-content: space-between;
    span{
      flex-basis: 50%;
    }
    span:last-child{
      text-align: right;
    }
  }
}
</style>
