<script setup lang="ts">
import { ref } from "vue"
// import IconHomeLogo from '~icons/home/logo.svg';
const name = ref("mytest")
</script>

<template>
	<div class="about">
		<h1>测试一下 {{ name }}!</h1>
		<el-icon size="22" color="red">
			<IconHomeLogo />
		</el-icon>
	</div>
</template>
