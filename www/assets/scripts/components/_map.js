var map = {
	el: {},
	setup: function() {
		map.createThree();
	},
	scene: new THREE.Scene(),
	camera: new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 ),
	createThree: function() {

		var renderer = new THREE.WebGLRenderer({ alpha: true });
		renderer.setSize( window.innerWidth, window.innerHeight );
		app.el.template.html( renderer.domElement );

		var light = new THREE.AmbientLight( 0xffffff ); // soft white light
		map.scene.add( light );

		var geometry    = new THREE.SphereGeometry(0.75, 64, 64);
		var material    = new THREE.MeshPhongMaterial();
		material.map    = THREE.ImageUtils.loadTexture('assets/images/map/startupMap.jpg');
		var earthMesh   = new THREE.Mesh(geometry, material);
		map.scene.add(earthMesh);

		map.camera.position.z = 1;
		earthMesh.rotation.y = 4.5;
		earthMesh.rotation.x = 0.9;
		var render = function () {
			requestAnimationFrame( render );

			//earthMesh.rotation.y += 0.01;
			//earthMesh.rotation.y += 0.01;

			renderer.render(map.scene, map.camera);
		};

		render();

	}
};