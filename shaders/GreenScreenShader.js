THREE.GreenScreenShader = {
	
	uniforms: {
		"tDiffuse": { value: null },
		"amount":   { value: 0.005 },
		"angle":    { value: 0.0 }
	},

	vertexShader: [

		"varying vec2 vUv;",

		"void main() {",

			"vUv = uv;",
			"gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",

		"}"

	].join( "\n" ),

	fragmentShader: [

		"uniform sampler2D tDiffuse;",
		"uniform float amount;",
		"uniform float angle;",

		"varying vec2 vUv;",

		"void main() {",
			"vec4 pixelr = texture2D(tDiffuse, vUv);",
			"vec4 pixelga = texture2D(tDiffuse, vUv);",
			"vec4 pixelb = texture2D(tDiffuse, vUv);",
			"vec3 eps = vec3(0.009, 0.009, 0.009);",
			"vec3 greenCol = vec3(0.0, 0.95, 0.0);",

			"if (pixelr.r < 0.1 && pixelga.g > 0.8 && pixelb.b < 0.1 && pixelga.a > 0.7) {",
				"gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);",
			"} else {",
				"gl_FragColor = vec4(pixelr.r, pixelga.g, pixelb.b, pixelga.a);",
			"}",
		"}"

	].join("\n"),

};