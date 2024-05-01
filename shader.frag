precision mediump float;

varying vec2 vTexCoord;
uniform float millis;
uniform float speed;
uniform vec3 color;

void main() {
    float x = vTexCoord.x;
    float y = vTexCoord.y;

    float r = (sin(millis / speed) + 1.) *.1;

    vec2 c = vec2(r * sin(millis / speed * .9) + .5, r * cos(millis / speed * .8) + .5);
    float d1 = distance(vTexCoord, vec2(c.x, c.y));
    float d2 = distance(vTexCoord, vec2(c.y, c.x));
    float d3 = distance(vTexCoord, vec2(1. - c.x, c.y));
    float d4 = distance(vTexCoord, vec2(c.x, 1. - c.y));

    vec3 mask = vec3(.03 / d1);
    mask += vec3(.03 / d2);
    mask += vec3(.03 / d3);
    mask += vec3(.03 / d4);
    // vec3 mask = vec3(.04 / d1, 0., 0.);
    // mask += vec3(0., .04 / d2, 0.);
    // mask += vec3(0., 0., .04 / d3);
    // mask += vec3(.04 / d4, .04 / d4, 0.);

    mask = smoothstep(.95, .95, mask);
    mask = 1. - mask;

    float alpha = 1. - mask.x;
    if (alpha < .5) {
        return;
    }
    vec3 col = (color + mask);
    gl_FragColor = vec4(col, 1.);
}