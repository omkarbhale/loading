document.querySelectorAll(".loading").forEach(container => {
    container.innerHTML = "";
    const width = container.dataset.width || 400;
    const speed = container.dataset.speed || 90;
    const color = eval(container.dataset.color) || [0, 0, 0];

    new p5((p5) => {
        let myShader;

        p5.preload = () => {
            myShader = p5.loadShader("shader.vert", "shader.frag");
        }

        p5.setup = () => {
            const canvas = p5.createCanvas(width, width, p5.WEBGL);
            container.appendChild(canvas.canvas);
            // p5.frameRate(144);
        }

        p5.draw = () => {
            p5.background(0, 0, 0, 0);
            myShader.setUniform('millis', p5.millis());
            myShader.setUniform('speed', speed);
            myShader.setUniform('color', color);
            p5.shader(myShader);
            p5.rect(0, 0, p5.width, p5.height);
        }
    });
})