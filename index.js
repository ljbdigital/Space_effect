
const {Composites, Query, Engine, Render, Bodies, World, MouseConstraint} = Matter;
let shapes = document.querySelector('.shapes');
let h = window.innerHeight - 20; let w = window.innerWidth- 20;

const engine = Engine.create();
const renderer = Render.create({
    element: shapes,
    engine: engine,
    options: {
        height: h,
        width: w,
        background: 'transparent',
        wireframes: false,
        pixelRatio: window.devicePixelRatio
    }
});


let colors = ['./images/plan1.png', './images/plan2.png', './images/plan3.png', './images/plan4.png', './images/plan5.png', './images/plan6.png']
const cShape = (x, y) => {
    return Bodies.circle(x, y, 20,  {
        render: {
            sprite: {
                texture: colors[Math.floor(Math.random()*colors.length)],
                xScale: 0.15,
                yScale: 0.15
            }
        }
    })
}

const bgg = Bodies.rectangle(w/2, h/2, 150, 150, {
    // density: 1,
    // friction: 1,
    size: 1,
        render: {
            sprite: {
                texture: './images/saturn.png',
                xScale: 0.5,
                yScale: 0.5,        
            }
        }
    })

const wallOptions = {
    isStatic: true,
    render: {visible: false}
}
const ground = Bodies.rectangle(w/2, h+50, w+100, 100, wallOptions)
const ceiling = Bodies.rectangle(w/2, -50, w+100, 100, wallOptions)
const leftWall = Bodies.rectangle(-50, h/2, 100, h+100, wallOptions)
const rightWall = Bodies.rectangle(w+50, h/2, 100, h+100, wallOptions)
const mouseControl = MouseConstraint.create(engine, {
    element: shapes,
    constraint: {render: {visible: false}}
})
let origItem = Composites.stack(50,50, 10, 10, w/5, h/5, (x, y) => {
    return cShape(x, y)
})

World.add(engine.world, [ bgg, origItem, mouseControl, ground, ceiling, leftWall, rightWall])

document.addEventListener('click', (e) => {
    const shape = cShape(e.pageX,e.pageY)
    World.add(engine.world, shape)
})


Engine.run(engine);
Render.run(renderer);

window.addEventListener('mousemove', (e) => {
    let {pageX, pageY} = e;
    let x = (pageX/window.innerWidth) - 0.5
    let y = (pageY/window.innerHeight) - 0.5
    engine.world.gravity.scale = 0.0005
    engine.world.gravity.x = x*2;
    engine.world.gravity.y = y*2;
})

window.addEventListener('resize', () => {
    window.location.reload()
})