THREE.GreenScreenShader = {
	
	uniforms: {
		"tDiffuse": { value: null }
		//"colour":   { value: new THREE.Color('0xd400') }
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
		"uniform vec3 colour;",

		"varying vec2 vUv;",

		"void main() {",
			"vec4 pixelr = texture2D(tDiffuse, vUv);",
			"vec4 pixelga = texture2D(tDiffuse, vUv);",
			"vec4 pixelb = texture2D(tDiffuse, vUv);",

			"if (pixelr.r < 0.1 && pixelga.g > 0.5 && pixelb.b < 0.1 && pixelga.a > 0.7) {",
				"gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);",
			"} else {",
				"gl_FragColor = vec4(pixelr.r, pixelga.g, pixelb.b, pixelga.a);",
			"}",

			//"gl_FragColor = vec4(pixelr.r, pixelga.g, pixelb.b, pixelga.a);",
		"}"

	].join("\n"),

};