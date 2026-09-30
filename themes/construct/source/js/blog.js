/*
MIT + Commons Clause License Condition v1.0

Copyright (c) 2026 David Haz

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, and distribute the Software **as part of an application, website, or product**, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

## Commons Clause Restriction

You may use this Software, including for any commercial purpose, **so long as you do not sell, sublicense, or redistribute the components themselves-whether alone, in a bundle, or as a ported version.**

## No Warranty

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
/* CONSTRUCT / 10-scene application study, 2026-09-30.
 * Motion source: Raven1119/CyberScientist/.design/research-interface-language/assets/reference.html
 * Source blob: 3231d674f5ab7fc58b12e281b75fe91ff7df147d (read via connector).
 * Application-local V9 DOM adaptations, NOT original React components.
 * Motion algorithms and timing retained; app bindings and visual styles are new.
 * React Bits: Copyright (c) 2026 David Haz, MIT + Commons Clause.
 * See THIRD_PARTY_NOTICES.txt. This is a complete application, not a component library.
 */

(() => {
'use strict';
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
const animations=new Set();
let enabled=document.body.dataset.motionDefault==='true';
const canMove=()=>enabled&&!reduced.matches;
 function wa(el,frames,options={}){
  if(!canMove()||!el?.isConnected)return null;
  const a=el.animate(frames,{duration:400,easing:'cubic-bezier(.215,.61,.355,1)',...options});
  animations.add(a);a.finished.catch(()=>{}).finally(()=>animations.delete(a));return a;
 }
 function split(el,text=el.textContent){
  el.textContent=text;if(!canMove())return;
  el.setAttribute('aria-label',text);el.textContent='';
  const graphemes=typeof Intl.Segmenter==='function'?[...new Intl.Segmenter('zh',{granularity:'grapheme'}).segment(text)].map(s=>s.segment):[...text];
  graphemes.forEach((c,i)=>{const span=document.createElement('span');span.className='split-char';span.textContent=c;span.setAttribute('aria-hidden','true');el.append(span);wa(span,[{opacity:0,transform:'translateY(40px)'},{opacity:1,transform:'translateY(0)'}],{duration:650,delay:i*30,fill:'backwards'});});
 }
 function enter(el,{distance=24,duration=600,delay=0,axis='Y'}={}){return wa(el,[{opacity:0,transform:`translate${axis}(${distance}px)`},{opacity:1,transform:'none'}],{duration,delay,fill:'backwards'});}

const root=document.body, select=document.querySelector('#theme-select'), toggle=document.querySelector('#motion-toggle');
const read=k=>{try{return localStorage.getItem(k)}catch{return null}};
const save=(k,v)=>{try{localStorage.setItem(k,v)}catch{/* Preferences remain usable without storage. */}};
const initial=read('raven-blog:theme');if(['blue','grey','night'].includes(initial))root.dataset.cilTheme=initial;
select.value=root.dataset.cilTheme;
select.addEventListener('change',()=>{root.dataset.cilTheme=select.value;save('raven-blog:theme',select.value)});
if(read('raven-blog:motion')!==null)enabled=read('raven-blog:motion')==='true';
function syncMotion(){document.documentElement.dataset.motion=canMove()?'on':'off';toggle.setAttribute('aria-pressed',String(enabled));toggle.textContent=reduced.matches?'动效：系统已减弱':enabled?'动效：开':'动效：关';if(!canMove())animations.forEach(a=>{try{a.finish()}catch{a.cancel()}})}
toggle.addEventListener('click',()=>{enabled=!enabled;save('raven-blog:motion',String(enabled));syncMotion()});reduced.addEventListener('change',syncMotion);syncMotion();
const menuButton=document.querySelector('.menu-button'), menu=document.querySelector('#mobile-nav');
function closeMenu(restore=true){menu.hidden=true;menuButton.setAttribute('aria-expanded','false');root.classList.remove('menu-open');if(restore)menuButton.focus()}
menuButton.addEventListener('click',()=>{if(!menu.hidden)return closeMenu();menu.hidden=false;menuButton.setAttribute('aria-expanded','true');root.classList.add('menu-open');enter(menu,{distance:24,duration:600});menu.querySelector('a').focus()});
menu.addEventListener('click',e=>{if(e.target.closest('a'))closeMenu(false)});
document.addEventListener('keydown',e=>{if(menu.hidden)return;if(e.key==='Escape'){e.preventDefault();closeMenu()}if(e.key==='Tab'){const items=[menuButton,...menu.querySelectorAll('a')],i=items.indexOf(document.activeElement);if(e.shiftKey&&i===0){e.preventDefault();items.at(-1).focus()}else if(!e.shiftKey&&i===items.length-1){e.preventDefault();menuButton.focus()}}});
const desktop=matchMedia('(min-width:761px)');desktop.addEventListener('change',()=>{if(desktop.matches)closeMenu(false)});
// RB-35, exact V9 defaults; RB-48 only the short Latin byline, never long-form text.
const intro=document.querySelector('.hero-type,.page-heading,.article-heading');if(intro)enter(intro);
const signature=document.querySelector('.hero-english');if(signature){/* Preserve semantic line breaks: split each line independently. */const lines=signature.innerText.split('\n');signature.replaceChildren();lines.forEach((line,i)=>{const span=document.createElement('span');signature.append(span);split(span,line);if(i<lines.length-1)signature.append(document.createElement('br'))})}
window.addEventListener('pagehide',()=>{animations.forEach(a=>a.cancel());closeMenu(false)});
window.addEventListener('pageshow',()=>closeMenu(false));
})();
