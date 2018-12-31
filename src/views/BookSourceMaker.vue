<template>
    <div id="book-source-maker">
        <el-form ref="form" class="el-col-sm-24 el-col-md-offset-2 el-col-md-20">
            <el-form-item label="直接输入书源代码进行解析">
                <el-input v-model="source.result" size="medium"></el-input>
                <el-button click="importSource" type="success" round v-loading.fullscreen.lock="fullscreenLoading">解析
                </el-button>
            </el-form-item>
            <form-card v-for="(rules,key) in ruleList" :key="key" v-bind:title="key" v-bind:rules="rules"></form-card>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">生成代码</el-button>
                <el-button type="success">下载到本地</el-button>
            </el-form-item>
        </el-form>
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
				ruleList:{},
                source:{
					result:""
                }
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
