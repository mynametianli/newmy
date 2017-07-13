<template>
    <div id="rewardrule">
          <div class="header">奖励规则设置</div>
          <div class="mysilder">
           <!-- {{value1}}-->
            <mu-table :showCheckbox="showcheck" ref="table" class="rewardtable">
              <mu-thead>
                <mu-tr>
                  <mu-th v-for="(head,index) in tablehead" :key="index">{{head}}</mu-th>
                </mu-tr>
              </mu-thead>
              <mu-tbody>
                <mu-tr v-for="(data,index) in tabledata" :key="index">
                  <mu-td v-for="(dt,inx) in data" :key="inx">{{dt}}</mu-td>
                  <mu-td>
                    <mu-raised-button label="修改比例" class="sizebt" primary @click="opendialog(data)"/>
                  </mu-td>
                </mu-tr>
              </mu-tbody>
            </mu-table>
          </div>
          <mu-dialog :open="dialog" :title="title" @close="close" dialogClass="dialogbox">
            <div class="dgcontent">
              <div>报单返还&ensp;&ensp;{{custormrestore+'%'}}</div>
              <div><mu-slider v-model="custormrestore" :step="1" :disabled = 'sliderban' class="demoslider"/></div>
              <div>现金奖励&ensp;&ensp;{{cashreward+'%'}}</div>
              <div><mu-slider v-model="cashreward" :step="1" :disabled = 'sliderban' class="demoslider"/></div>
            </div>
            <mu-flat-button slot="actions" @click="close" primary label="取消"/>
            <mu-flat-button slot="actions" primary @click="setreward" label="确定"/>
          </mu-dialog>
    </div>
</template>
<script>
  export default{
    name:'rewardrule',
    data(){
      return {
        showcheck:false,
        tablehead:['等级','报单返还比例','现金奖励比例','操作'],
        tabledata:[{lv:'工作室',restore:'40%',cash:'5%'},{lv:'运营中心',restore:'50%',cash:'5%'},{lv:'分公司',restore:'60%',cash:'5%'}],
        dialog:false,
        title:'',
        sliderban:false,
        cashreward:0,
        custormrestore:0

      }
    },
    methods:{
      close(){
        this.dialog = false;
      },
      opendialog(data){
        this.cashreward = parseInt(data.cash);
        this.custormrestore = parseInt(data.restore);
        this.title = data.lv + '奖励规则设置';
        this.dialog = true;
      },
      setreward(){
        this.$http({
          method:'',
          url:'',
          body:''
        }).then( res => {

        }, err => {

        })
      }
    },
    created(){

    }
  }
</script>
<style scoped>
  #rewardrule{
    width:100%;
    height:100%;
    position:relative;
  }
  .header{
    width:100%;
    height:2.2rem;
    background:#cbcbcb;
    line-height:2.2rem;
    text-align:left;
    font-size:.85rem;
    padding-left:2rem;
  }
  .mysilder{
    height:calc(100% - 2.2rem);
    width:100%;
    padding:.5rem;
  }
  .rewardtable{
    border:1px solid #ccc;
  }
  .sizebt{
    width:30px;
    height:30px;
    line-height:30px;
  }
  .dgcontent{
    padding:.5rem;
  }
  .demoslider{
    margin-top:16px;
  }
</style>
<style>
  .dialogbox{
    width:400px !important;
    height:500px !important;
  }
</style>
