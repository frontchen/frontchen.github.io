---
title: table中渲染select等组件卡顿问题
tag:
  - 项目总结
date: 2023-11-06
category:
  - 开发日志
---

<el-table class="table" :data="tableData" height="200" @cell-click="showSelect">
<el-table-column label="js" prop="js">
<template #default="scope">
<el-select :ref="el=>getCellRef('js',scope&&scope.$index,el)" v-if="tableShow[scope&&scope.$index]&&tableShow[scope&&scope.$index].jsShow" v-model="scope.row.js" @change="val=>tableCellChange('js',scope&&scope.$index,val)" placeholder="" >
<el-option
        v-for="item in js"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
</el-select>
<el-input
      v-else
      :value="getJsLabel(scope&&scope.row&&scope.row.js)"
      readonly
      suffix-icon="arrow"
    />
</template>
</el-table-column>
<el-table-column label="字母" prop="letter" >
<template #default="scope">
<el-select :ref="el=>getCellRef('letter',scope&&scope.$index,el)" v-if="tableShow[scope&&scope.$index]&&tableShow[scope&&scope.$index].letterShow" v-model="scope.row.letter" @change="val=>tableCellChange('letter',scope&&scope.$index,val)" placeholder="" >
<el-option
        v-for="item in letter"
        :key="item.id"
        :label="item.label"
        :value="item.id"
      />
</el-select>
<el-input
      v-else
      :value="getLetterLabel(scope&&scope.row&&scope.row.letter)"
      readonly
        suffix-icon="arrow"
    />
</template>
</el-table-column>
<el-table-column label="其他" prop="other">
<template #default="scope">
<el-select :ref="el=>getCellRef('other',scope&&scope.$index,el)" v-if="tableShow[scope&&scope.$index]&&tableShow[scope&&scope.$index].otherShow" v-model="scope.row.other" @change="val=>tableCellChange('other',scope&&scope.$index,val)" placeholder="" >
<el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
</el-select>
<el-input
      v-else
      :value="getOtherLabel(scope&&scope.row&&scope.row.other)"
      readonly
    suffix-icon="arrow" />
</template>
</el-table-column>
</el-table>

<script setup>
import {nextTick,  ref,reactive } from 'vue'
const options = [
  {
    value: 'Option1',
    label: 'Option1'
  },
  {
    value: 'Option2',
    label: 'Option2'
  },
  {
    value: 'Option3',
    label: 'Option3'
  },
  {
    value: 'Option4',
    label: 'Option4'
  },
  {
    value: 'Option5',
    label: 'Option5'
  }
]
const letter = [
  { id: 1, label: 'Option A', desc: 'Option A' },
  { id: 2, label: 'Option B', desc: 'Option B' },
  { id: 3, label: 'Option C', desc: 'Option C' },
  { id: 4, label: 'Option A', desc: 'Option A' }
]
const js = [
  {
    value: 'HTML',
    label: 'HTML'
  },
  {
    value: 'CSS',
    label: 'CSS'
  },
  {
    value: 'JavaScript',
    label: 'JavaScript'
  }
]
const tableData =ref([])
const tableShow=reactive({})
const getJsLabel=value=>{
  let item=js.find(v=>v.value===value)||{}
  return item.label
}
const getLetterLabel=value=>{
  let item=letter.find(v=>v.id===value)||{}
  return item.label
}
const getOtherLabel=value=>{
  let item=options.find(v=>v.value===value)||{}
  return item.label
}
const tableCellChange=(name,index,value)=>{
tableShow[index][`${name}Show`]=false
tableData.value[index][name]=value
}
const showSelect=(row, column, )=>{
  const name=column.property
  const index=row.index
  tableShow[index][`${name}Show`]=true
  nextTick(()=>{
    const ref=cellrefs.value[`${name}${index}`]
    ref&&ref.toggleMenu()
  })
}
const cellrefs=ref({})
const getCellRef=(name,index,ref)=>{
cellrefs.value[`${name}${index}`]=ref
}
for (let i = 0; i < 300; i++) {
  tableShow[i]={
    jsShow:false,
    letterShow:false,
    otherShow:false
  }
  tableData.value.push({
    index:i,
    js: '',
    letter: '',
    other: ''
  })
}
</script>
<style >
  
 .el-table__header{
   margin:0;
  }
  .el-table__body{
       margin:0;
  }
</style>
