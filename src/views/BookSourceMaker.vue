<template>
    <div id="book-source-maker">
        <el-form ref="form" class="el-col-sm-24 el-col-md-offset-2 el-col-md-20">
            <el-form-item label="直接输入书源代码进行解析">
                <el-input v-model="result" size="medium"></el-input>
                <el-button @click="importSource" type="success" round>解析
                </el-button>
            </el-form-item>
            <form-card v-for="(rules,key) in ruleList" :key="key" v-bind:title="key" v-bind:rules="rules"></form-card>
            <el-form-item>
                <el-button type="primary" @click="generateCode">生成代码</el-button>
            </el-form-item>
        </el-form>

        <el-dialog
                title="书源代码"
                :visible.sync="configure.dialogVisible"
                width="22rem">
            <el-input :value="result"></el-input>
            <span slot="footer" class="dialog-footer">
                <el-button :type="configure.copyButtonType" @click="doCopy">{{configure.copyButton}}</el-button>
                <a class="el-button el-button--success" :href="downloadUrl" download="bookSource.txt">下载到本地</a>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import FormCard from "../components/FormCard";
    import axios from 'axios'

    export default {
        name: "BookSourceMaker",
        components: {FormCard},
        data: function () {
            return {
                ruleList: {},
                result: "",
                configure:{
                    dialogVisible:false,
                    copyButton:"复制",
                    copyButtonType:"primary",
                }
            }
        },
        computed:{
          downloadUrl:function () {
              let blob = new Blob([this.result],{type : 'application/json'});
              return URL.createObjectURL(blob);
          }
        },
        methods: {
            generateCode: function () {
                const ruleList = this.ruleList;
                const rules = {};
                Object.keys(ruleList).forEach(category => {
                    let partRules = ruleList[category];
                    Object.keys(partRules).forEach(
                        key => {
                            rules[key] = partRules[key].value
                        }
                    )
                });
                this.result = JSON.stringify(rules);
                this.configure.dialogVisible = true;
                this.configure.copyButton="复制";
                this.configure.copyButtonType ="primary";
            },
            doCopy:function () {
                this.$copyText(this.result).then(_ => {
                    this.configure.copyButton="已复制";
                    this.configure.copyButtonType ="info";
                })
            },
            importSource:function () {
                const rules = JSON.parse(this.result);
                const ruleList = this.ruleList;
                Object.keys(ruleList).forEach(category => {
                    let partRules = ruleList[category];
                    Object.keys(partRules).forEach(
                        key => {
                            ruleList[category][key].value=rules[key];
                        }
                    )
                });
            }
        },
        mounted() {
            const booksource = this;
            axios.get('data/bookSourceRule.json').then(res => {
                booksource.ruleList = res.data
            });
        }
    }
</script>

<style scoped>

</style>
