(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{35:function(e,t,n){},45:function(e,t,n){"use strict";n.r(t);var a=n(1),r=n(0),c=n(15),i=n.n(c),s=n(14),o=(0,n(0).createContext)(),l=n(8),u={login:"[auth] login",signup:"[auth] signup",logout:"[auth] logout",hasToken:"[auth] hastoken",getCompany:"[company] getCompany",addCompany:"[company] addCompany",companyUpdate:"[company] companyUpdate",companyDelete:"[company] companyDelete"},d=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1?arguments[1]:void 0;switch(t.type){case u.login:case u.signup:case u.hasToken:return Object(l.a)({},t.payload);case u.logout:return{logged:!1};default:return e}},p=(n(34),n(35),n(26)),j=n(28),b=n(19),m=n(12),h=n(7),x=n(3),O=n.n(x),f=n(6),g="https://bratic-app.herokuapp.com/api",y=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"GET",a="".concat(g,"/").concat(e);return"GET"===n?fetch(a):fetch(a,{method:n,headers:{"Content-type":"application/json"},body:JSON.stringify(t)})},v=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"GET",a="".concat(g,"/").concat(e),r=localStorage.getItem("bratic-token")||"";return"GET"===n?fetch(a,{method:n,headers:{"x-token":r}}):fetch(a,{method:n,headers:{"Content-type":"application/json","x-token":r},body:JSON.stringify(t)})},C=n(17),k=n.n(C),w=function(){var e=Object(f.a)(O.a.mark((function e(t,n){var a,r,c,i;return O.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,y("auth/login",{email:t,password:n},"POST");case 2:return a=e.sent,e.next=5,a.json();case 5:if(!(r=e.sent).ok){e.next=13;break}return c={id:r.id,name:r.name,email:r.email,logged:!0,token:r.token},localStorage.setItem("bratic-user",JSON.stringify(c)),localStorage.setItem("bratic-token",r.token),e.abrupt("return",c);case 13:i=r.msg,k.a.fire("Error",i,"error");case 15:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),E=function(){var e=Object(f.a)(O.a.mark((function e(t,n,a){var r,c,i,s;return O.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,y("auth/signup",{name:t,email:n,password:a},"POST");case 2:return r=e.sent,e.next=5,r.json();case 5:if(!(c=e.sent).ok){e.next=13;break}return i={id:c.id,name:c.name,email:c.email,token:c.token,logged:!0},localStorage.setItem("bratic-user",JSON.stringify(i)),localStorage.setItem("bratic-token",c.token),e.abrupt("return",i);case 13:s=c.msg,k.a.fire("Error",s,"error");case 15:case"end":return e.stop()}}),e)})));return function(t,n,a){return e.apply(this,arguments)}}(),N=n(16),L=function(){var e=Object(f.a)(O.a.mark((function e(t){var n,a;return O.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return"https://api.cloudinary.com/v1_1/bratic-app/upload",(n=new FormData).append("upload_preset","bratic-app"),n.append("file",t),e.next=6,fetch("https://api.cloudinary.com/v1_1/bratic-app/upload",{method:"POST",body:n}).then((function(e){return e.json()})).then((function(e){return a=e.secure_url})).catch((function(e){return console.log(e)}));case 6:return e.abrupt("return",a);case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),F=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=Object(r.useState)(e),n=Object(s.a)(t,2),a=n[0],c=n[1],i=function(){c(e)},o=function(e){var t=e.target;c(Object(l.a)(Object(l.a)({},a),{},Object(N.a)({},t.name,t.value)))},u=function(){var e=Object(f.a)(O.a.mark((function e(t){var n,r,i;return O.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.target,r=n.files[0],e.next=4,L(r);case 4:return i=e.sent,e.next=7,c(Object(l.a)(Object(l.a)({},a),{},Object(N.a)({},n.name,i)));case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return{values:a,setValues:c,handleInputChange:o,handleFileChange:u,resetForm:i}},T=function(){var e=F({}),t=e.values,n=e.handleInputChange,c=t.email,i=t.password,s=Object(r.useContext)(o).dispatch,l=function(){var e=Object(f.a)(O.a.mark((function e(t){var n;return O.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),e.next=3,w(c,i);case 3:n=e.sent,s({type:u.login,payload:n});case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(a.jsx)(a.Fragment,{children:Object(a.jsxs)("section",{className:"login",children:[Object(a.jsxs)("form",{onSubmit:l,children:[Object(a.jsx)("label",{children:"Email"}),Object(a.jsx)("input",{type:"email",onChange:n,placeholder:"Tu email",name:"email"}),Object(a.jsx)("label",{children:"Contrase\xf1a"}),Object(a.jsx)("input",{type:"password",onChange:n,placeholder:"Contrase\xf1a",name:"password"}),Object(a.jsx)("button",{type:"submit",className:"my-btn mini",children:"Entrar"})]}),Object(a.jsxs)("small",{children:["\xbfNo tienes cuenta? Crea una ",Object(a.jsx)(m.b,{to:"/registro",children:"aqu\xed"})," "]})]})})},S=function(){var e=F({}),t=e.values,n=e.handleInputChange,c=t.name,i=t.email,s=t.password,l=t.password2,d=Object(r.useContext)(o).dispatch,p=function(){var e=Object(f.a)(O.a.mark((function e(t){var n;return O.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.preventDefault(),s!==l){e.next=8;break}return e.next=4,E(c,i,s);case 4:n=e.sent,d({type:u.signup,payload:n}),e.next=9;break;case 8:k.a.fire("Error","Las contrase\xf1as deben coincidir","error");case 9:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(a.jsx)(a.Fragment,{children:Object(a.jsxs)("section",{className:"login",children:[Object(a.jsxs)("form",{onSubmit:p,children:[Object(a.jsx)("label",{children:"Nombre"}),Object(a.jsx)("input",{type:"text",onChange:n,placeholder:"Tu nombre",name:"name"}),Object(a.jsx)("label",{children:"Email"}),Object(a.jsx)("input",{type:"email",onChange:n,placeholder:"Tu email",name:"email"}),Object(a.jsx)("label",{children:"Contrase\xf1a"}),Object(a.jsx)("input",{type:"password",onChange:n,placeholder:"Contrase\xf1a",name:"password"}),Object(a.jsx)("label",{children:"Repite Contrase\xf1a"}),Object(a.jsx)("input",{type:"password",onChange:n,placeholder:"Repite Contrase\xf1a",name:"password2"}),Object(a.jsx)("button",{type:"submit",className:"my-btn mini",children:"Registro"})]}),Object(a.jsxs)("small",{children:["\xbfYa est\xe1s registrado? Entra ",Object(a.jsx)(m.b,{to:"/",children:"aqu\xed"})," "]})]})})},V=n(18),I=function(e){var t=e.nameValue,n=e.deleteField,c=e.inputType,i=e.editLabel,o=e.editAction,l=e.editValue,u=e.submitEdit,d=e.imageEdit,p=void 0!==d&&d,j=Object(r.useState)(!1),b=Object(s.a)(j,2),m=b[0],h=b[1],x=function(){return h(!1)},O=function(){return h(!0)};return Object(a.jsxs)(a.Fragment,{children:[l?Object(a.jsxs)("div",{className:"edit-group",children:[p?Object(a.jsxs)("div",{children:[Object(a.jsxs)("p",{children:[i,": "]}),Object(a.jsx)("figure",{children:Object(a.jsx)("img",{src:l,alt:t})})]}):Object(a.jsxs)("p",{children:[i,": ",Object(a.jsx)("strong",{children:l})]}),Object(a.jsxs)("div",{children:[Object(a.jsx)("button",{className:"my-btn mini secondary",onClick:function(){return n(t)},children:"Borrar"}),Object(a.jsx)("button",{className:"my-btn mini",onClick:O,children:"Editar"})]})]}):Object(a.jsxs)("div",{className:"edit-group",children:[Object(a.jsxs)("p",{children:[i,": ",Object(a.jsx)("small",{children:"Sin datos"})]}),Object(a.jsx)("button",{className:"my-btn mini",onClick:O,children:"A\xf1adir"})]}),Object(a.jsxs)(V.a,{className:"edit-modal my-modals",show:m,onHide:x,children:[Object(a.jsx)(V.a.Header,{children:Object(a.jsx)(V.a.Title,{children:l})}),Object(a.jsx)(V.a.Body,{children:Object(a.jsxs)("form",{className:"edit-form",onSubmit:u,children:[Object(a.jsx)("input",{name:t,type:c,onChange:o,placeholder:l}),Object(a.jsx)("button",{className:"my-btn",type:"submit",onClick:x,children:"Guardar"})]})}),Object(a.jsx)(V.a.Footer,{children:Object(a.jsx)("button",{className:"my-btn",onClick:x,children:"cerrar"})})]})]})},D=function(){var e=Object(f.a)(O.a.mark((function e(t){var n,a,r;return O.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,v("companies/",t,"POST");case 2:return n=e.sent,e.next=5,n.json();case 5:if(!(a=e.sent).ok){e.next=9;break}return r=a.company,e.abrupt("return",r);case 9:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),R=function(){var e=Object(f.a)(O.a.mark((function e(t,n){var a,r,c,i;return O.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,v("companies/".concat(t),n,"PUT");case 2:return a=e.sent,e.next=5,a.json();case 5:if(!(r=e.sent).ok){e.next=12;break}return c=r.company,k.a.fire("\xa1Chachi!","Los cambios han sido guardados","success"),e.abrupt("return",c);case 12:i=r.error,k.a.fire("Error",i,"error");case 14:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),A=function(){var e=Object(f.a)(O.a.mark((function e(t){return O.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,v("companies/".concat(t),{},"DELETE");case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),U=(0,n(0).createContext)(),B=function(){var e=Object(r.useContext)(U),t=e.company,n=e.dispatchCompany,c=t.name,i=t.phone,s=t.address,o=t._id,d=t.mainEmail,p=t.mainLogo,j=t.secondaryLogo,b=t.linkedin,m=t.facebook,h=t.twitter,x=t.instagram,g=F(t),y=g.values,v=g.setValues,C=g.handleInputChange,k=g.handleFileChange,w=function(){var e=Object(f.a)(O.a.mark((function e(){return O.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,A(o);case 2:n({type:u.companyDelete});case 3:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),E=function(){var e=Object(f.a)(O.a.mark((function e(t){var a;return O.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:a=Object(l.a)(Object(l.a)({},y),{},Object(N.a)({},t,"")),v(Object(l.a)(Object(l.a)({},y),{},Object(N.a)({},t,""))),n({type:u.updateCompany,payload:a});case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),L=function(e){e.preventDefault(),n({type:u.updateCompany,payload:y})},T=function(){var e=Object(f.a)(O.a.mark((function e(){return O.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,R(o,t);case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(a.jsxs)(a.Fragment,{children:[Object(a.jsx)("h1",{children:"Datos de empresa"}),Object(a.jsx)("button",{className:"my-btn mini",onClick:T,children:"Guardar Cambios"}),Object(a.jsx)("button",{className:"my-btn secondary mini",onClick:w,children:"Borrar esta empresa"}),Object(a.jsxs)("div",{className:"editing",children:[Object(a.jsx)(I,{deleteField:E,nameValue:"name",inputType:"text",editLabel:"Nombre de empresa",editAction:C,editValue:c,submitEdit:L}),Object(a.jsx)(I,{deleteField:E,nameValue:"address",inputType:"text",editLabel:"Direcci\xf3n",editAction:C,editValue:s,submitEdit:L}),Object(a.jsx)(I,{deleteField:E,nameValue:"phone",inputType:"text",editLabel:"Tel\xe9fono principal",editAction:C,editValue:i,submitEdit:L}),Object(a.jsx)(I,{deleteField:E,nameValue:"mainEmail",inputType:"email",editLabel:"Email principal",editAction:C,editValue:d,submitEdit:L}),Object(a.jsx)(I,{deleteField:E,nameValue:"mainLogo",imageEdit:!0,inputType:"file",editLabel:"Logo Principal",editAction:k,editValue:p,submitEdit:L}),Object(a.jsx)(I,{deleteField:E,nameValue:"secondaryLogo",imageEdit:!0,inputType:"file",editLabel:"Logo BN",editAction:k,editValue:j,submitEdit:L}),Object(a.jsx)(I,{deleteField:E,nameValue:"twitter",inputType:"text",editLabel:"Twitter Url",editAction:C,editValue:h,submitEdit:L}),Object(a.jsx)(I,{deleteField:E,nameValue:"facebook",inputType:"text",editLabel:"Facebook url",editAction:C,editValue:m,submitEdit:L}),Object(a.jsx)(I,{deleteField:E,nameValue:"instagram",inputType:"text",editLabel:"Instagram Url",editAction:C,editValue:x,submitEdit:L}),Object(a.jsx)(I,{deleteField:E,nameValue:"linkedin",inputType:"text",editLabel:"Linkedin Url",editAction:C,editValue:b,submitEdit:L})]})]})},P=function(e){e.company;var t=e.setFetchingCompany,n=F({}),r=n.values,c=n.handleInputChange,i=n.handleFileChange,s=function(){var e=Object(f.a)(O.a.mark((function e(n){var a;return O.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n.preventDefault(),e.next=3,D(r);case 3:a=e.sent,t(!0),a;case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(a.jsx)(a.Fragment,{children:Object(a.jsxs)("form",{className:"add-form",onSubmit:s,children:[Object(a.jsx)("input",{type:"text",name:"name",placeholder:"Nombre de la empresa",onChange:c}),Object(a.jsx)("input",{type:"email",name:"mainEmail",placeholder:"Correo Principal",onChange:c}),Object(a.jsx)("input",{type:"text",name:"phone",placeholder:"Tel\xe9fono principal",onChange:c}),Object(a.jsx)("input",{type:"text",name:"address",placeholder:"Direcci\xf3n",onChange:c}),Object(a.jsx)("input",{type:"text",name:"linkedin",placeholder:"URL Linkedin",onChange:c}),Object(a.jsx)("input",{type:"text",name:"facebook",placeholder:"URL Facebook",onChange:c}),Object(a.jsx)("input",{type:"text",name:"instagram",placeholder:"URL Instagram",onChange:c}),Object(a.jsx)("input",{type:"text",name:"twitter",placeholder:"URL Twitter",onChange:c}),Object(a.jsxs)("div",{className:"input-images",children:[Object(a.jsxs)("div",{children:[Object(a.jsx)("label",{htmlFor:"mainLogo",children:"Logo principal"}),Object(a.jsx)("input",{type:"file",className:"file-input",name:"mainLogo",id:"mainLogo",placeholder:"Logo Principal",onChange:i})]}),Object(a.jsxs)("div",{children:[Object(a.jsx)("label",{htmlFor:"secondaryLogo",children:"Logo en BN"}),Object(a.jsx)("input",{type:"file",className:"file-input",name:"secondaryLogo",id:"secondaryLogo",placeholder:"Logo Secundario",onChange:i})]})]}),Object(a.jsx)("button",{className:"my-btn mini",type:"submit",children:"Crear empresa"})]})})},J=function(){var e=Object(r.useRef)(!0),t=Object(r.useContext)(U).company;return Object(r.useEffect)((function(){return function(){e.current=!1}}),[]),Object(a.jsx)(a.Fragment,{children:t._id?Object(a.jsx)(B,{}):Object(a.jsx)(P,{})})},_=function(){var e=Object(r.useContext)(o).user;return Object(a.jsx)("div",{children:Object(a.jsxs)("h1",{children:["\xa1Bienvenid@ ",e.name,"!"]})})},G=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0;switch(t.type){case u.getCompany:case u.addCompnany:case u.companyUpdate:case u.deleteProperty:return Object(l.a)({},t.payload);case u.maquinasCategoriesUpdate:return Object(l.a)(Object(l.a)({},e),{},{maquinasCategories:t.payload});case u.companyDelete:return{};default:return e}},q=function(){var e=Object(r.useContext)(o).dispatch,t=function(){var t=Object(f.a)(O.a.mark((function t(){return O.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e({type:u.logout});case 2:localStorage.removeItem("bratic-token"),localStorage.removeItem("bratic-user");case 4:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();return Object(a.jsx)(a.Fragment,{children:Object(a.jsxs)("nav",{className:"dash-nav",children:[Object(a.jsxs)("ul",{children:[Object(a.jsx)("li",{children:Object(a.jsx)(m.b,{to:"/bratic",children:Object(a.jsx)("figure",{children:Object(a.jsx)("img",{src:"https://res.cloudinary.com/bratic-app/image/upload/v1609866461/logoBN_ujpbti.svg",alt:""})})})}),Object(a.jsx)("li",{children:Object(a.jsx)(m.b,{to:"/bratic/empresa",children:"Datos de empresa"})})]}),Object(a.jsxs)("div",{className:"btn-group",children:[Object(a.jsx)("small",{children:"Made with \u2665 by Yai"}),Object(a.jsx)("small",{children:"\xa9 Bratic S.L."}),Object(a.jsx)("button",{className:"my-btn secondary mini",onClick:t,children:"Cerrar Sesi\xf3n"})]})]})})},Y=function(){return Object(a.jsx)("nav",{className:"login-nav",children:Object(a.jsxs)("div",{className:"container",children:[Object(a.jsx)("figure",{children:Object(a.jsx)("img",{src:"https://res.cloudinary.com/bratic-app/image/upload/v1609866461/logoBN_ujpbti.svg",alt:""})}),Object(a.jsxs)("ul",{children:[Object(a.jsx)("li",{children:Object(a.jsx)(m.b,{to:"/",children:"Entrar"})}),Object(a.jsx)("li",{children:Object(a.jsx)(m.b,{to:"/registro",children:"Registro"})})]})]})})},H=function(){var e=Object(r.useRef)(!0),t=Object(r.useContext)(o).user,n=Object(r.useReducer)(G,{}),c=Object(s.a)(n,2),i=c[0],l=c[1];return Object(r.useEffect)((function(){return function(){e.current=!1}})),Object(r.useEffect)((function(){e.current&&y("companies").then((function(e){return e.json()})).then((function(e){return l({type:u.getCompany,payload:e.company[0]})})).catch((function(e){return new Error(e)}))}),[]),Object(a.jsx)(m.a,{children:Object(a.jsx)("div",{children:t.token?Object(a.jsx)(U.Provider,{value:{company:i,dispatchCompany:l},children:Object(a.jsxs)("div",{className:"dashboard-container",children:[Object(a.jsx)(q,{}),Object(a.jsx)("main",{children:Object(a.jsxs)(h.d,{children:[Object(a.jsx)(h.b,{exact:!0,path:"/bratic",component:_}),Object(a.jsx)(h.b,{exact:!0,path:"/bratic/empresa",component:J}),Object(a.jsx)(h.a,{to:"/bratic"})]})})]})}):Object(a.jsxs)(a.Fragment,{children:[Object(a.jsx)(Y,{}),Object(a.jsxs)("main",{className:"container",children:[Object(a.jsxs)(h.d,{children:[Object(a.jsx)(h.b,{exact:!0,path:"/",component:T}),Object(a.jsx)(h.b,{path:"/registro",component:S}),Object(a.jsx)(h.a,{to:"/"})]}),Object(a.jsx)("small",{children:"Made with \u2665 by Yai"}),Object(a.jsx)("small",{children:"\xa9 Bratic S.L."})]})]})})})};p.a.add(j.a,b.d,b.b,b.c,b.a);var M=function(){return JSON.parse(localStorage.getItem("bratic-user"))||{logged:!1}},z=function(){var e=Object(r.useRef)(!0),t=Object(r.useReducer)(d,{},M),n=Object(s.a)(t,2),c=n[0],i=n[1];return Object(r.useEffect)((function(){return function(){e.current=!1}}),[]),Object(r.useEffect)((function(){e.current&&localStorage.setItem("bratic-user",JSON.stringify(c))}),[c]),Object(a.jsx)(a.Fragment,{children:Object(a.jsx)(o.Provider,{value:{user:c,dispatch:i},children:Object(a.jsx)(H,{})})})};i.a.render(Object(a.jsx)(z,{}),document.getElementById("root"))}},[[45,1,2]]]);
//# sourceMappingURL=main.a56b7c45.chunk.js.map