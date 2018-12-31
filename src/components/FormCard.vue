<template>
    <el-card :header="title" style="margin-bottom: 2.5rem">
        <el-row  class="el-col-lg-8 el-col-md-12 el-col-sm-24" v-for="(rule,key) in rules">
            <el-form-item :label="rule.label" :key="key" style="margin-right: 1rem">
                <el-input v-model="rule.value"/>
            </el-form-item>
        </el-row>
    </el-card>
</template>

<script>
	export default {
		name: "FormCard",
      props:['title','rules']
	}
</script>

<style scoped>

</style>
