import{C as S,r as e,u as N,P as j,a as B,b as L,c as D,_ as I,j as C}from"./index-CO151OhE.js";var f=S.extend({defaultProps:{__TYPE:"Chart",id:null,type:null,data:null,options:null,plugins:null,width:null,height:null,style:null,className:null,children:void 0},css:{classes:{root:"p-chart"},inlineStyles:{root:function(a){var s=a.props;return Object.assign({width:s.width,height:s.height},s.style)}},styles:`
        @layer primereact {
            .p-chart {
                position: relative
            }
        }
        `}}),x=function(){try{return Chart}catch{return null}}(),E=e.memo(e.forwardRef(function(n,a){var s=N(),d=e.useContext(j),t=f.getProps(n,d),o=f.setMetaData({props:t}),l=o.ptm,c=o.cx,h=o.sx,g=o.isUnstyled;B(f.css.styles,g,{name:"chart"});var y=e.useRef(null),r=e.useRef(null),i=e.useRef(null),P=function(){m();var v={type:t.type,data:t.data,options:t.options,plugins:t.plugins};x?r.current=new x(i.current,v):I(()=>import("./auto.esm-D4M7p1sz.js"),[]).then(function(p){m(),i.current&&p&&(p.default?r.current=new p.default(i.current,v):r.current=new p(i.current,v))})},m=function(){r.current&&(r.current.destroy(),r.current=null)};e.useImperativeHandle(a,function(){return{props:t,getCanvas:function(){return i.current},getChart:function(){return r.current},getBase64Image:function(){return r.current.toBase64Image()},getElement:function(){return y.current},generateLegend:function(){return r.current&&r.current.generateLegend()},refresh:function(){return r.current&&r.current.update()}}}),e.useEffect(function(){P()}),L(function(){m()});var _=t.options&&t.options.plugins&&t.options.plugins.title&&t.options.plugins.title.text,w=t.ariaLabel||_,R=s({id:t.id,ref:y,style:h("root"),className:D(t.className,c("root"))},f.getOtherProps(t),l("root")),b=s({ref:i,width:t.width,height:t.height,role:"img","aria-label":w},l("canvas"));return e.createElement("div",R,e.createElement("canvas",b))}),function(n,a){return n.data===a.data&&n.options===a.options&&n.type===a.type});E.displayName="Chart";function M({label:n,values:a,colors:s}){const[d,t]=e.useState({}),[o,l]=e.useState({});return e.useEffect(()=>{setTimeout(()=>{const c=getComputedStyle(document.documentElement),h={labels:n,datasets:[{data:a,backgroundColor:[c.getPropertyValue(s[0]),c.getPropertyValue(s[1])]}]},g={plugins:{legend:{labels:{usePointStyle:!0}}}};t(h),l(g)},1e3)},[]),C.jsx("div",{className:"card flex justify-content-center",children:C.jsx(E,{type:"pie",data:d,options:o,className:"w-full md:w-40rem"})})}export{M as default};
