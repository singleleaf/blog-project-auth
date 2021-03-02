<template>
    <div style="width:100%">
        <div class="search-wrapper">
            <el-input
                placeholder="请输入标签名称"
                v-model="newTag"
                @keyup.enter.native="createTag"
                class="search-input"
                clearable
            >
            </el-input>
            <el-button
                type="primary"
                icon="el-icon-plus"
                @click="createTag"
            >新增标签</el-button>
        </div>
        <el-table
            ref="multipleTable"
            :data="tagList"
            tooltip-effect="dark"
            :default-sort="{prop: 'date', order: 'descending'}"
            @selection-change="handleSelectionChange"
            style="width: 100%"
        >
            <el-table-column
                ref="test"
                type="selection"
                width="55"
            >
            </el-table-column>
            <el-table-column
                prop="categoryName"
                align="center"
                label="标签名称"
            >
                <template slot-scope="scope">
                    <el-input
                        class="wcategory"
                        :readonly="scope.row.readonly"
                        v-model="scope.row.tagName"
                        placeholder="请输入内容"
                    ></el-input>
                </template>
            </el-table-column>
            <el-table-column
                align="center"
                label="操作"
                show-overflow-tooltip
            >
                <template slot-scope="scope">
                    <el-button
                        v-show="scope.row.readonly"
                        type="primary"
                        icon="el-icon-edit"
                        @click="Edit(scope.$index)"
                    >修改</el-button>
                    <el-button
                        class="no-margin"
                        v-show="!scope.row.readonly"
                        type="primary"
                        icon="el-icon-check"
                        @click="confirm(scope.$index)"
                    >确认</el-button>
                    <el-button
                        class="no-margin"
                        v-show="!scope.row.readonly"
                        type="warning"
                        icon="el-icon-close"
                        @click="cancle(scope.$index)"
                    >取消</el-button>
                    <el-button
                        type="danger"
                        icon="el-icon-delete"
                        @click="del(scope.row._id)"
                    >删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-button
            class="del-batch"
            type="danger"
            icon="el-icon-delete"
            @click="delCategoryBatch"
        >批量删除</el-button>
        <div class="pagination-wrapper">
            <el-pagination
                background
                :current-page="page"
                layout="prev, pager, next, jumper"
                </el-pagination>
                </div>
                </div>
                </template>

<script>
    export default {
        name: "NewTag",
        data() {
            return {
                tagList: [],
                newTag: "",
                keyword: "",
                page: 1,
                initialValue: "",
                selectedList: []
            };
        },
        mounted() {
            this.getTagList();
        },
        methods: {
            //获取标签列表
            getTagList() {
                this.axios
                    .get("/getTagList", {

                            page: this.page

                    })
                    .then(res => {
                        var data = res.body.list;
                        this.tagList = data.map(item => {
                            item.readonly = true;
                            return item;
                        });
                        // console.log(data)
                        // console.log(this.articleList)
                        //  console.log(data.data.count)
                    });
            },
            //编辑分类信息
            Edit(index) {
                this.tagList[index].readonly = false;
                this.initialValue = this.tagList[index].tagName;
            },
            // 确定修改分类信息
            confirm(index) {
                this.$confirm("是否修改该标签?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning",
                    center: true
                })
                    .then(() => {
                        let { _id, tagName } = this.tagList[index];
                        this.tagList[index].readonly = false;
                        // 调用修改分类接口
                        this.modifyTag(_id, tagName );
                    })
                    .catch(() => {
                        this.cancle(index);
                    });
            },
            // 取消修改
            cancle(index) {
                this.tagList[index].readonly = true;
                this.tagList[index].tagName = this.initialValue;
            },
            modifyTag(id,tagName) {
                this.axios.postJson("/modifyTag", {id,tagName  }).then(res => {
                    if (res.code === 200) {
                        this.$message({
                            type: "success",
                            message: "修改成功!"
                        });
                        this.getTagList();
                    } else {
                        this.$message({
                            type: "error",
                            message: res.msg
                        });
                    }
                });
            },
            del(id) {
                this.$confirm("是否删除标签?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning",
                    center: true
                }).then(() => {
                    this.axios.postJson("/delTag", { id }).then(res => {
                        console.log(res);
                        if (res.code === 200) {
                            this.$message({
                                type: "success",
                                message: res.msg
                            });
                            this.getTagList();
                        } else {
                            this.$message({
                                type: "error",
                                message: res.msg
                            });
                        }
                    });
                });
            },
            delCategoryBatch() {
                this.del(this.selectedList);
            },
            createTag() {
                this.newTag = this.newTag.trim();
                if (!this.newTag) {
                    this.$message({
                        type: "error",
                        message: "请填写分类"
                    });
                    return;
                }
                this.axios
                    .postJson("/createTag", { tagName: this.newTag })
                    .then(res => {
                        if (res.code === 200) {
                            this.$message({
                                type: "success",
                                message: res.msg
                            });
                            this.getTagList();
                        } else {
                            this.$message({
                                type: "error",
                                message: res.msg
                            });
                        }
                    });
            },

            handleSelectionChange(val) {
                this.selectedList = val.map(item => {
                    return item._id;
                });
                //  console.log(this.selectedList)
            }
        }
    };
</script>
<style scoped>
    .search-wrapper {
        display: flex;
        /* margin: 15px; */
    }
    .search-wrapper > .el-input {
        margin-right: 10px;
    }
</style>
