import{u as D,B as k,I as w,F as x,a as l,b as E,M as I,v as N,h as j,c as d}from"./index-fa150d79.js";import{bB as f,bH as A,bY as M,bX as T,bC as p,bG as e,bT as m}from"./vendor-a57b68ca.js";import"./vant-234921e0.js";const q="_logo_12u35_1",O="_icon_12u35_8",L="_appName_12u35_12",u={logo:q,icon:O,appName:L},R=n=>{const s=f(n);return{ref:s,toggle:()=>s.value=!s.value,on:()=>s.value=!0,off:()=>s.value=!1}},X=A({props:{name:{type:String}},setup:(n,s)=>{const b=D(),g=M(),B=T(),r=f(),{ref:y,toggle:U,on:v,off:C}=R(!1),t=p({email:"",code:""}),o=p({}),F=async a=>{var c;a.preventDefault();const h=[{key:"email",type:"required",message:"必填"},{key:"email",type:"pattern",regex:/.+@.+/,message:"必须是邮箱地址"},{key:"code",type:"required",message:"必填"}];if(Object.assign(o,{email:void 0,code:void 0}),Object.assign(o,N(t,h)),!j(o)){const S=await d.post("/session",t).catch(i);localStorage.setItem("jwt",S.data.jwt);const V=(c=B.query.return_to)==null?void 0:c.toString();b.refreshMe(),g.push(V||"/")}},i=a=>{throw a.response.status===422&&Object.assign(o,a.response.data.errors),a},_=async()=>{v(),await d.post("/validation_codes",{email:t.email},{_autoLoading:!0}).catch(i).finally(C),r.value.startCount()};return()=>e(I,null,{title:()=>"登录",icon:()=>e(k,null,null),default:()=>e("div",{class:u.wrapper},[e("div",{class:u.logo},[e(w,{class:u.icon,name:"bird"},null),e("h1",{class:u.appName},[m("自由记账")])]),e(x,{onSubmit:F},{default:()=>[e(l,{label:"邮箱地址",type:"text",placeholder:"请输入邮箱，然后点击发送验证码",modelValue:t.email,"onUpdate:modelValue":a=>t.email=a,error:o.email?o.email[0]:"　"},null),e(l,{ref:r,label:"验证码",type:"validationCode",disabled:y.value,placeholder:"请输入六位数字",onClick:_,modelValue:t.code,"onUpdate:modelValue":a=>t.code=a,error:o.code?o.code[0]:"　"},null),e(l,{style:{paddingTop:"96px"}},{default:()=>[e(E,{type:"submit"},{default:()=>[m("登录")]})]})]})])})}});export{X as SignInPage,X as default};
