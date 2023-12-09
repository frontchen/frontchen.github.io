<template>
	<div class="busuanzi">
		<!-- http://ibruce.info/2015/04/04/busuanzi/ -->
		<span id="busuanzi_container_site_pv">本站总访问量<span id="busuanzi_value_site_pv"></span>次</span>
		<span id="busuanzi_container_site_uv">
			本站访客数<span id="busuanzi_value_site_uv"></span>人次
		</span>
		<div id="runtime_span">
			本站勉强运行 <span class="color">{{ A }}</span>天<span class="color">{{ B }}</span>小时<span class="color">{{ C }}</span>分<span class="color">{{ D }}</span>秒
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			A: '',
			B: '',
			C: '',
			D: ''
		}
	},
	methods: {
		show_runtime() {
			window.setTimeout(this.show_runtime, 1000)
			let X, Y, T, M, a, b, c
			X = new Date('1/1/2018 00:00:00')
			Y = new Date()
			T = Y.getTime() - X.getTime()
			M = 24 * 60 * 60 * 1000
			a = T / M
			this.A = Math.floor(a)
			b = (a - this.A) * 24
			this.B = Math.floor(b)
			c = (b - this.B) * 60
			this.C = Math.floor((b - this.B) * 60)
			this.D = Math.floor((c - this.C) * 60)
		}
	},
	mounted() {
		this.show_runtime()
	}
}
</script>
<style scoped>
.busuanzi {
	font-size: 14px !important;
}
#busuanzi_value_site_pv,
.color {
	color: #ffd215;
	font-weight: bold;
}
#runtime_span {
	margin-top: 10px;
}
</style>
