<!-- Example Svelte Page / Starter Web Page-->
<script lang="ts">

// utils
import { generateColorShades, generateTailwindCustomColorShades } from '$utils/utils';

// types
import type { PageData } from "./$types";

let c1Value = "oklch(33% 0.094 250.8)"; // hex:#013663 // aka Berkeley Blue
let c1Name = "exampleBlue";
let c2Value = "";
let c2Name = ""; // hex:#FBE44A // aka Maize
let c3Value = "";
let c3Name = ""; // hex: #bd4089 // aka Mulberry
let c4Value = "";
let c4Name = ""; // hex: #ed254e // aka Crayola Red
let c5Value = "";
let c5Name = ""; // footer shades from legacy site // aka gunMetal
let c6Value = "";
let c6Name = "";
let c7Value = "";
let c7Name = "";
let c8Value = "";
let c8Name = "";


interface Color {
	name: string;
	inputColor: string;
}
const colors = [
	{
		"name": c1Name,
		"inputColor": c1Value,
	},
	{
		"name": c2Name,
		"inputColor": c2Value,
	},
	{
		"name": c3Name,
		"inputColor": c3Value,
	},
	{
		"name": c4Name,
		"inputColor": c4Value,
	},
	{
		"name": c5Name,
		"inputColor": c5Value,
	},
	{
		"name": c6Name,
		"inputColor": c6Value,
	},
]

// variables

let index: number;
let value: string;

export let data: PageData;


const inputs = [
	{
	bind: "inputColor",
	label: "Color",
	placeholder: "oklch(70% 0.1 358)",
	id: "value"
}, {
	bind: "name",
	label: "Name",
	placeholder: "rose",
	id: "name"
}];


</script>

<template lang="pug">
	svelte:head
		title ColorGraffle: A Custom TailwindCSS Custom OKLCH Color Palette Generator

	header.page-x-padding.pt-4
		h1.font-semibold.mb-3.text-24 {data.header.heading}
		.max-w-lg {data.header.text}

	main.page-x-padding.main-y-padding.grid.grid-cols-1.gap-y-8.mb-8

		section#inputs
			h2.font-semibold.mb-3 Input Colors
			div(
				class=`
					gap-y-6
					grid
					grid-cols-1
					lg:gap-x-4
					lg:grid-cols-3
					xl:grid-cols-4
					`
				)
				+each('colors as color, index')

					+if('index == 0 || colors[(index - 1)]?.inputColor')
						div(class=`
							bg-exampleBlue-500/40
							gap-y-2
							grid
							grid-cols-1
							p-2
							rounded
							lg:grid-cols-1
							lg:gap-x-2
							lg:items-center
							lg:place-items-start
							`)
							//-.whitespace-nowrap.mb-1(
								class=``
								) Color {index + 1}
							+each('inputs as input')
								.w-full
									//-label(
										for!="color-{index + 1}-{input.id}"
										class=`
											hidden
											opacity-80
											whitespace-nowrap
										`
										) Color
									.group.relative.w-full
										input(
											id!="color-{index + 1}-{input.id}"
											class=`
												px-2
												pt-6
												pb-2
												rounded
												text-exampleBlue-600
												w-full
												`
											style!="min-width: 25ch;"
											bind:value!="{colors[index][input.bind]}",
											placeholder!="{input.placeholder}",
											type="text")
										label(
											for!="color-{index + 1}-{input.id}"
											class=`
												absolute
												font-semibold
												left-0
												pl-2
												pointer-events-none
												pt-1
												text-13
												top-0
												`
										) {input.label}



		section#swatches
			h2.font-semibold.mb-3 Swatches
			+each('colors as color, index')
				+const('shades = color.inputColor ? generateColorShades(color.inputColor) : null')
				+const('values = shades ? Object.values(shades) : null')
				+const('keys = shades ? Object.keys(shades) : null')
				+const('name = color.name ? color.name : "color" + (index + 1).toString()')

				//- name
				+if('values')
					.font-medium.mb-2.text-15 {name}

				//- swatches
				+if('values && keys')
					.grid.grid-cols-1.gap-x-4.gap-y-4.min-h-fit.mb-8(class="sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-12 xl:grid-cols-12")
						+each('values as value, index')
							.grid.grid-cols-1.max-w-sm.relative

								.py-2(
									class!="text-white"
									style!="background-color:{value.replace(' / <alpha-value>', '')};") &nbsp;

								.text-14(
									class=`
										absolute
										flex
										items-center
										h-full
										min-w-[64px]
										bg-neutral-100/60
										p-2
										lg:relative
										lg:h-auto
										lg:w-auto
										lg:p-0
										lg:block
									`
								) {keys[index] == "DEFAULT" ? " (default)" : keys[index]}

		section#config.w-full
			h2.font-semibold.mb-3 TailwindCSS Config
			div
				+each('colors as color')

					//- tailwind config
					+if('color.inputColor')
						+const('name = color.name ? color.name : "untitled"')
						textarea.w-full.px-4.rounded(class="py-[.5lh]" style!="height:15.5lh;")
							| {generateTailwindCustomColorShades(color.inputColor, name)}

		section#notes
			h2.font-semibold.mb-3 {data.notesSection.heading}
			ul.grid.grid-cols-1.gap-y-1.list-disc.list-outside.pl-3
				+each('data.notesSection.notes as note')
					li
						+html('note')

		section#more-reading
			h2.font-medium.mb-2 {data.moreReadingSection.heading}
			+each('data.moreReadingSection.links as link')
				a(
					class=`
						block
						mb-1
						w-fit
						opacity-90
						underlinable
						focusable
						hoverable
						`
					href="{link.href}"
					rel="external"
					) {link.label}

		section#credits
			h2.font-medium.mb-2 {data.creditsSection.heading}
			+each('data.creditsSection.credits as credit')
				p.mb-2 {credit.text}
				a(
					class=`block underlinable focusable hoverable mb-1`
					href!="{credit.link.href}"
					rel!="{credit.link.rel}"
					) {credit.link.label}

	footer#footer.page-x-padding.pb-20.text-14.grid.grid-cols-1.gap-y-4
		div.opacity-70(class="lg:hover:opacity-100")
			| Made with&nbsp;
			a(href="https://svelte.dev/" rel="external") Svelte
			| &nbsp; by Kevin Peckham @&nbsp;
			a(href="https://lightningjar.com" rel="external") Lightning Jar
			| &nbsp;in Philadelphia.

		.flex.gap-4
			+each('data.footer.links as link')
				a(
					class=`
						block
						opacity-70
						underlinable
						w-fit
						focusable
						hoverable
					`
					href!="{link.href}"
					rel="{link.rel}"
					title!="{link.title}"
					) {link.label}

</template>
