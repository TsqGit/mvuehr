<template>
  <div>
    <div>
      <el-input
        size="small"
        class="addPosInput"
        placeholder="添加职位..."
        prefix-icon="el-icon-plus"
        @keydown.enter.native="addPosition"
        v-model="pos.name"
      >
      </el-input>
      <el-button
        icon="el-icon-plus"
        size="small"
        type="primary"
        @click="addPosition"
        >添加</el-button
      >
    </div>
    <div class="posManaMain">
      <el-table :data="positions" stripe border style="width: 70%">
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="id" label="编号" width="55"> </el-table-column>
        <el-table-column prop="name" label="职位名称" width="250">
        </el-table-column>
        <el-table-column prop="createDate" width="300" label="创建时间">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="showEditView(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog
      title="职位修改"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <div>
        <el-tag>职位名称</el-tag>
        <el-input class="updatePosInput" size="small" v-model="updatePos.name"></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="doUpdate"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pos: {
        name: "",
      },
      updatePos: {
        name: "",
      },
      positions: [],
      dialogVisible: false
    };
  },
  mounted() {
    this.initPositions();
  },

  methods: {
    addPosition() {
      if (this.pos.name) {
        this.postRequest("/system/basic/pos/", this.pos).then((resp) => {
          if (resp) {
            this.initPositions();
            this.pos.name = "";
          }
        });
      } else {
        this.$message.error("职位名称不能为空");
      }
    },
    showEditView(index, data) {
      // this.updatePos = data;
      // 数据拷贝，防止弹窗修改数据时影响表单数据
      Object.assign(this.updatePos,data);
      this.dialogVisible = true;
    },
    doUpdate() {
      this.putRequest("/system/basic/pos/", this.updatePos).then((resp) => {
        if (resp) {
          this.initPositions();
          this.updatePos.name = '';
          this.dialogVisible = false; 
        }
      })
    },
    handleDelete(index, data) {
      this.$confirm(
        "此操作将永久删除【" + data.name + "】, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          this.deleteRequest("/system/basic/pos/" + data.id).then((resp) => {
            if (resp) {
              this.initPositions();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    initPositions() {
      this.getRequest("/system/basic/pos/").then((resp) => {
        if (resp) {
          this.positions = resp;
        }
      });
    },
  },
};
</script>

<style  scoped>
.addPosInput {
  width: 300px;
  margin-right: 8px;
}

  .updatePosInput {
      width: 200px;
      margin-left: 8px;
  }

.posManaMain {
  margin-top: 10px;
}
</style>
