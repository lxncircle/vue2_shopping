<template>
  <div class="pagination">
    <!-- 上 -->
    <button :disabled="pageNo == 1" @click="$emit('getPageNo', pageNo - 1)">上一页</button>
    <button v-if="startNumAndEndNum.start > 1" @click="$emit('getPageNo', 1)" :class="{ active: pageNo == 1 }">
      1
    </button>
    <button v-if="startNumAndEndNum.start > 2">···</button>

    <!-- 中间部分 -->
    <button
      v-for="(page, index) in startNumAndEndNum.end"
      :key="index"
      v-if="page >= startNumAndEndNum.start"
      @click="$emit('getPageNo', page)"
      :class="{ active: pageNo == page }"
    >
      {{ page }}
    </button>
    <!-- 下 -->
    <button v-if="startNumAndEndNum.end < totalPage - 1">···</button>
    <button v-if="startNumAndEndNum.end < totalPage" @click="$emit('getPageNo', totalPage)" :class="{ active: pageNo }">
      {{ totalPage }}
    </button>
    <button :disabled="pageNo == totalPage" @click="$emit('getPageNo', pageNo + 1)">下一页</button>

    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: ['pageNo', 'pageSize', 'total', 'continues'],
  // 计算属性
  computed: {
    totalPage() {
      // Math.ceil() 向上取整
      return Math.ceil(this.total / this.pageSize)
      // 计算出连续的页码的起始数字和结束数字【连续页码的数字：至少是5】
    },
    startNumAndEndNum() {
      // 先定义两个遍历存储其实数字与结束数字
      let start = 0
      let end = 0
      // 连续页码数字5【就是至少5页】，若出现不正常现象【就是不够5页】
      // 不正常现象【总页数没有连续页码多】
      if (this.continues > this.totalPage) {
        start = 1
        end = totalPage
      } else {
        //正常现象【连续页码是5，但是你的总页码一定是大于5的】
        // 起始数字
        start = this.pageNo - parseInt(this.continues / 2)
        // 结束数字
        end = this.pageNo + parseInt(this.continues / 2)
        // 把出现不正常的现象【start数字出现0 | 负数】纠正
        if (start < 1) {
          start = 1
          end = this.continues
        }
        // 把
        if (end > this.totalPage) {
          end = this.totalPage
          start = this.totalPage - this.continues + 1
        }
      }
      return { start, end }
    },
  },
}
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
.active {
  background: skyblue;
}
</style>
