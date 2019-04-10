/**
 * Created by HL on 2019/4/10.
 */

let width= window.innerWidth;
let height= window.innerHeight;
let projection=d3.geoMercator()
.center([114,29])
.scale(850)
.translate([width/2,height/2]);
let svg=d3.select("#map")
    .append("svg")
    .attr("width", width)
    .attr("height", height);
var path = d3.geoPath()
    .projection(projection);

//随机颜色，十六进制方法；
function getRandomColor( ) {
    var rand = Math.floor(Math.random( ) * 0xFFFFFF).toString(16);
    if(rand.length == 6){
        return rand;
    }else{
        return getRandomColor();
    }
}

d3.json("./data/chinapolygon.geojson").then(function(root) {
    let map=svg.append("g");
    map.append("path");
    map.selectAll(".mymap")
        .data( root.features )
        .enter()
        .append("path")
        .attr("stroke","#000")
        .attr("stroke-width",1)
        .attr("fill", function (d,i) {
            return "#"+getRandomColor();
        })
        .attr("d", path)   //使用地理路径生成器
        .on("mouseover",function(d,i){
            d3.select(this)
                .attr("fill","yellow");
        })
        .on("mouseout",function(d,i){
            d3.select(this)
                .attr("fill","#"+getRandomColor());
        });
});