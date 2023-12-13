<template>
	<div class="flex flex-col min-h-screen ">
		<NuxtLoadingIndicator class="bg-primary" :throttle="50" />
		<MoleculesNavbar
			class="z-[3] text-primary-content"
		/>
		<slot></slot>
	</div>
</template>

<script setup>


</script>
