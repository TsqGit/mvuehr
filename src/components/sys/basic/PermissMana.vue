<template>
  <div>
    <div class="permissManaTool">
      <el-input size="small" placeholder="请输入角色英文名" v-model="role.name">
        <template slot="prepend">ROLE_</template>
      </el-input>
      <el-input
        size="small"
        placeholder="请输入角色中文名"
        v-model="role.nameZh"
      ></el-input>
      <el-button type="primary" size="small" icon="el-icon-plus"
        >添加角色</el-button
      >
    </div>
    <div class="permissManaMain">
      <el-collapse accordion @change="change">
        <el-collapse-item
          :title="r.nameZh"
          :name="r.id"
          v-for="(r, index) in roles"
          :key="index"
        >
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>可访问的资源</span>
              <el-button
                style="float: right; padding: 3px 0; color: #ff0000"
                type="text"
                icon="el-icon-delete"
              ></el-button>
            </div>
            <div>
              <el-tree
                :data="allMenus"
                :props="defaultProps"
                show-checkbox
              ></el-tree>
            </div>
          </el-card>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      allMenus: [],
      defaultProps: {
        children: "children",
        label: "name",
      },
      roles: [],
      role: {
        name: "",
        nameZh: "",
      },
    };
  },
  mounted() {
    this.initRoles();
  },
  methods: {
    change(name) {
      if(name) {
        this.initAllMenus();
      }
    },
    initAllMenus() {
      this.getRequest("/system/basic/permiss/menus").then((resp) => {
        if (resp) {
          this.allMenus = resp;
        }
      });
    },
    initRoles() {
      this.getRequest("/system/basic/permiss/").then((resp) => {
        if (resp) {
          this.roles = resp;
        }
      });
    },
  },
};
</script>

<style>
.permissManaTool {
  display: flex;
  justify-content: flex-start;
}

.permissManaTool .el-input {
  width: 300px;
  margin-right: 6px;
}

.permissManaMain {
  margin-top: 10px;
  width: 700px;
}
</style>
