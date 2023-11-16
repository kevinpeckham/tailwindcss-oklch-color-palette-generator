
// functions
export function generateFactors(min: number, max: number, factor: number) {
	const factors = [];
	for (let i = Math.ceil(min / factor); i <= Math.floor(max / factor); i++) {
		factors.push(i * factor);
	}
	return factors;
}

export function getLightnessChromaHueFromOKLCH(color: string){
  //oklch(32.89% 0.094 250.81)
  // if (!color.includes("oklch")) return {
	// 	lightness: 0,
	// 	chroma: 0,
	// 	hue: 0,
	// };

  // remove last character from array -- ')'
	const lastRemoved = color.substring(0, color.length - 1);

	// remove first part of string up to first parenthesis -- 'oklch('
	const firstRemoved = lastRemoved.split("(")[1];

	// split into array -- ['32.89%', '0.094', '250.81']
	const array = firstRemoved.split(" ");

	const output = {
		lightness: Number((Number(array[0].replace("%", "")) * .01).toPrecision(4)),
		chroma: Number(array[1]),
		hue: Number(array[2]),
	}
  return output;
}

export function generateOKLCHColor(
	lightness: number, // decimal e.g. .50
	chroma: number,
	hue: number,
	includeFallback?: boolean
) {
	return `oklch(${lightness} ${chroma} ${hue} ${includeFallback ? '/ <alpha-value>' : ''})`;
}

export function generateOKLCHShades(
	lightness: number,
	chroma: number,
	hue: number,
	// factor?: number,
	includeFallback?: boolean
) {
	const min = 50;
	const max = 950;
	const derivedFactor = 50;
	const lightnessValues: number[] = generateFactors(min, max, derivedFactor);

	// object to hold shade values
	const obj: { [key: number | string]: string } = {};

	// iterate color for each lightness value
	lightnessValues.forEach((lightness) => {
		const l = Number((lightness * 0.001).toPrecision(3));
		const c = chroma;
		const h = hue;
		const key = (1000 - lightness).toString();

		// only 50, 950 & factors of 100
		if (key.includes('00') || ['50','950'].includes(key)) obj[(1000 - lightness).toString()] = generateOKLCHColor(l, chroma, hue, includeFallback ?? undefined);
	});

	// add in original color as default
	obj["DEFAULT"] = generateOKLCHColor(lightness, chroma, hue, includeFallback ?? undefined);
	return obj;
}
interface Shades {
    [key: string]: string;
    [key: number]: string;
};


export function generateColorShades(OKLCHColor:string) {
	// input should be an oKLCH color in CSS format e.g. 'oklch(32.89% 0.094 250.81)'
	const obj = getLightnessChromaHueFromOKLCH(OKLCHColor);
	const shades = generateOKLCHShades(obj.lightness, obj.chroma, obj.hue, true);
	return shades;
}

export function generateTailwindCustomColorShades(OKLCHColor: string, name: string) {

	const shades = generateColorShades(OKLCHColor);
	return `${name}: ${JSON.stringify(shades, null, 2)}`;
}

// export function generateRGBShades(
// 	chroma: number,
// 	hue: number,
// 	factor?: number,
// ) {
// 	const min = 50;
// 	const max = 950;
// 	const derivedFactor = factor ? factor : 50;
// 	const lightnessValues: number[] = generateFactors(min, max, derivedFactor);
// 	const obj: { [key: number | string]: string } = {};
// 	lightnessValues.forEach((lightness) => {
// 		const l = Number((lightness * 0.001).toPrecision(3));
// 		const c = chroma;
// 		const h = hue;

// 		const rgb = oklchToRGB(l, c, hue);
// 		obj[(1000 - lightness).toString()] = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
// 	});
// 	return obj;
// }
// export function oklchToRGB(l: number, c: number, h: number): number[] {
// 	const oklab = oklchToOklab(l, c, h);
// 	const linearSRGB = oklabToLinearSRGB(oklab[0], oklab[1], oklab[2]);
// 	const rgb = linearSRGBToRGB(linearSRGB[0], linearSRGB[1], linearSRGB[2]);
// 	return rgb;
// }
// export function oklchToOklab(l: number, C: number, H: number): number[] {
// 	const hr = (Math.PI / 180) * H;
// 	const a = C * Math.cos(hr);
// 	const b = C * Math.sin(hr);
// 	// const l = L;
// 	// const m = (l + 0.16) / 1.16;
// 	return [l, a, b];
// }
// export function oklabToLinearSRGB(L: number, a: number, b: number): number[] {
// 	const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
// 	const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
// 	const s_ = L - 0.0894841775 * a - 1.291485548 * b;

// 	const l = Math.pow(l_, 3);
// 	const m = Math.pow(m_, 3);
// 	const s = Math.pow(s_, 3);

// 	return [
// 		4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s, // r
// 		-1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s, // g
// 		-0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s, //b
// 	];
// }
// export function linearSRGBToRGB(r: number, g: number, b: number): number[] {
// 	const gammaCorrect = (x: number) =>
// 		x <= 0.0031308 ? 12.92 * x : 1.055 * Math.pow(x, 1 / 2.4) - 0.055;
// 	const R = Math.round(255 * gammaCorrect(r));
// 	const G = Math.round(255 * gammaCorrect(g));
// 	const B = Math.round(255 * gammaCorrect(b));
// 	return [
// 		Math.min(255, Math.max(0, R)),
// 		Math.min(255, Math.max(0, G)),
// 		Math.min(255, Math.max(0, B)),
// 	];
// }

// export function getRGBValuesFromCSSRGB(rgb: string) {
// 	const rgbArray = rgb.split(",");
// 	const r = Number(rgbArray[0].split("(")[1]);
// 	const g = Number(rgbArray[1]);
// 	const b = Number(rgbArray[2].split(")")[0]);
// 	const array = [r,g,b];
// 	return array;
// }

// export function convertRGBtoLinearSRGB(rgb: number[]) {
// 	const [ r, g, b ] = rgb;
// 	const R = r / 255;
// 	const G = g / 255;
// 	const B = b / 255;
// 	return [R, G, B];
// }

// export function convertRGBToHex(r: number, g: number, b: number) {
// 	return `#${r.toString(16).padStart(2, "0")}${g
// 		.toString(16)
// 		.padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
// }
