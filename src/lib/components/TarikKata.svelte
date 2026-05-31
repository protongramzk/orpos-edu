<script>

    import {
        onMount,
        onDestroy
    } from "svelte";

    let {
        level,
        judul = "TARIK KATA",
        onWin = () => {},
        onExit = () => {}
    } = $props();

    let canvas;

    let ctx;

    let width = 0;
    let height = 0;

    let pairs =
        level?.pairs ?? [];

    let leftNodes = [];
    let rightNodes = [];

    let matches = [];

    let dragging = false;

    let startNode = null;

    let pointerX = 0;
    let pointerY = 0;

    let accent = "#00a8ff";
    let accentText = "#fff";

    const CARD_W = 140;
    const CARD_H = 56;

    // =====================
    // INIT
    // =====================

    onMount(() => {

        ctx =
            canvas.getContext("2d");

        const css =
            getComputedStyle(
                document.documentElement
            );

        accent =
            css
            .getPropertyValue(
                "--accent"
            )
            .trim();

        accentText =
            css
            .getPropertyValue(
                "--accent-text"
            )
            .trim();

        resize();

        window.addEventListener(
            "resize",
            resize
        );

        canvas.addEventListener(
            "pointerdown",
            pointerDown
        );

        canvas.addEventListener(
            "pointermove",
            pointerMove
        );

        canvas.addEventListener(
            "pointerup",
            pointerUp
        );

    });

    onDestroy(() => {

        window.removeEventListener(
            "resize",
            resize
        );

    });

    // =====================
    // BUILD
    // =====================

    function buildNodes(){

        leftNodes = [];

        rightNodes = [];

        const gap = 80;

        const startY = 120;

        const shuffled =
            [...pairs]
            .map(
                p => p[1]
            )
            .sort(
                () =>
                Math.random()-0.5
            );

        pairs.forEach(
            (pair,i)=>{

            leftNodes.push({

                text:pair[0],

                answer:pair[1],

                x:width * 0.25,

                y:startY + i * gap,

                done:false

            });

        });

        shuffled.forEach(
            (word,i)=>{

            rightNodes.push({

                text:word,

                x:width * 0.75,

                y:startY + i * gap,

                done:false

            });

        });

    }

    // =====================
    // RESIZE
    // =====================

    function resize(){

        const rect =
            canvas.parentElement
            .getBoundingClientRect();

        width = rect.width;

        height =
            Math.max(
                window.innerHeight,
                pairs.length * 90 + 180
            );

        canvas.width =
            width;

        canvas.height =
            height;

        buildNodes();

        draw();

    }

    // =====================
    // DRAW
    // =====================

    function draw(){

        if(!ctx)
            return;

        ctx.clearRect(
            0,
            0,
            width,
            height
        );

        drawLines();

        leftNodes.forEach(
            drawNode
        );

        rightNodes.forEach(
            drawNode
        );

        if(
            dragging &&
            startNode
        ){

            ctx.strokeStyle =
                accent;

            ctx.lineWidth = 4;

            ctx.beginPath();

            ctx.moveTo(
                startNode.x,
                startNode.y
            );

            ctx.lineTo(
                pointerX,
                pointerY
            );

            ctx.stroke();

        }

    }

    function drawNode(node){

        ctx.fillStyle =
            node.done
            ? "#333"
            : accent;

        ctx.fillRect(

            node.x -
            CARD_W / 2,

            node.y -
            CARD_H / 2,

            CARD_W,

            CARD_H

        );

        ctx.fillStyle =
            accentText;

        ctx.font =
            "16px sans-serif";

        ctx.textAlign =
            "center";

        ctx.textBaseline =
            "middle";

        ctx.fillText(

            node.text,

            node.x,

            node.y

        );

    }

    function drawLines(){

        ctx.strokeStyle =
            accent;

        ctx.lineWidth = 5;

        matches.forEach(
            m => {

            ctx.beginPath();

            ctx.moveTo(
                m.x1,
                m.y1
            );

            ctx.lineTo(
                m.x2,
                m.y2
            );

            ctx.stroke();

        });

    }

    // =====================
    // HIT TEST
    // =====================

    function getNodeAt(
        x,
        y,
        list
    ){

        return list.find(

            n =>

            x >=
            n.x - CARD_W/2 &&

            x <=
            n.x + CARD_W/2 &&

            y >=
            n.y - CARD_H/2 &&

            y <=
            n.y + CARD_H/2

        );

    }

    // =====================
    // POINTER
    // =====================

    function pointerDown(e){

        const rect =
            canvas.getBoundingClientRect();

        const x =
            e.clientX -
            rect.left;

        const y =
            e.clientY -
            rect.top;

        const node =
            getNodeAt(
                x,
                y,
                leftNodes
            );

        if(
            !node ||
            node.done
        ){
            return;
        }

        startNode =
            node;

        dragging =
            true;

        pointerX = x;
        pointerY = y;

        draw();

    }

    function pointerMove(e){

        if(!dragging)
            return;

        const rect =
            canvas.getBoundingClientRect();

        pointerX =
            e.clientX -
            rect.left;

        pointerY =
            e.clientY -
            rect.top;

        draw();

    }

    function pointerUp(e){

        if(
            !dragging ||
            !startNode
        ){
            return;
        }

        const rect =
            canvas.getBoundingClientRect();

        const x =
            e.clientX -
            rect.left;

        const y =
            e.clientY -
            rect.top;

        const target =
            getNodeAt(
                x,
                y,
                rightNodes
            );

        if(target){

            if(
                target.text ===
                startNode.answer
            ){

                matches.push({

                    x1:startNode.x,
                    y1:startNode.y,

                    x2:target.x,
                    y2:target.y

                });

                startNode.done =
                    true;

                target.done =
                    true;

                if(
                    matches.length ===
                    pairs.length
                ){

                    onWin(100);

                }

            }

        }

        dragging = false;

        startNode = null;

        draw();

    }

</script>

<div class="root">

    <div class="topbar">

        <button
            class="back"
            onclick={onExit}
        >
            ←
        </button>

        <div class="title">
            {judul}
        </div>

    </div>

    <canvas
        bind:this={canvas}
    ></canvas>

</div>

<style>

.root{

    width:100%;

    min-height:100vh;

    background:#111;

    color:white;

}

.topbar{

    display:flex;

    align-items:center;

    gap:12px;

    padding:16px;

}

.back{

    width:48px;

    height:48px;

    border:none;

    background:var(--accent);

    color:var(--accent-text);

    cursor:pointer;

}

.title{

    font-size:26px;

    font-weight:bold;

    color:var(--accent);

}

canvas{

    display:block;

    width:100%;

    touch-action:none;

}

</style>
