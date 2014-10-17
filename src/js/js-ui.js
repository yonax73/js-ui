/*!
 * js-ui.js
 * Copyright 2014 YonaxTics, Inc.
 * Licensed under http://www.apache.org/licenses/LICENSE-2.0
 */
/* ========================================================================
 * js-ui.js
 * yonax73@gmail.com
 * ========================================================================
 * Copyright 2014 yonaxTics, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */
/*
 * ========================================================================
 * This project is dedicated at  all my loved ones, in special a my mother and my wife <3.
 * ========================================================================
 */
/*
 * ========================================================================
 * Author  : Yonatan Alexis Quintero Rodriguez
 * Version : 0.1
 * Date    : 5 Oct 2014
 * ========================================================================
 */
/**
 * NameSpace
 */
var UI = {};




/*
 * ========================================================================
 * UI-Notify
 * Author  : Yonatan Alexis Quintero Rodriguez
 * Version : 0.1
 * Date    : 5 Oct 2014
 * ========================================================================
 */

/*
 * @param HtmlElement
 */
UI.Notify = function(HtmlElement) {

    var button = null;
    var span = null;
    var p = null;
    var i = null;
    var UINotify = null;

    this.init = function() {
        UINotify = this;
        this.close();
        button = document.createElement('button');
        button.className = 'close';
        button.type = 'button';
        button.onclick = function() {
            UINotify.close();
        }
        span = document.createElement('span');
        span.textContent = '×';
        button.appendChild(span);
        HtmlElement.appendChild(button);
        p = document.createElement('p');
        p.className = 'text-center';
        i = document.createElement('i');
        p.appendChild(i);
        strong = document.createElement('strong');
        p.appendChild(strong);
        HtmlElement.appendChild(p);
    }

    this.close = function() {
        HtmlElement.className = 'hidden';
    }


    this.success = function(message) {
        i.className = 'fa fa-smile-o fa-lg pull-left';
        HtmlElement.className = 'alert alert-success alert-dismissible';
        strong.textContent = message;
    }


    this.info = function(message) {
        i.className = 'fa fa-info fa-lg pull-left';
        HtmlElement.className = 'alert alert-info alert-dismissible';
        strong.textContent = message;
    }


    this.warning = function(message) {
        i.className = 'fa fa-exclamation-triangle fa-lg pull-left';
        HtmlElement.className = 'alert alert-warning alert-dismissible';
        strong.textContent = message;
    }


    this.danger = function(message) {
        i.className = 'fa fa-frown-o fa-lg pull-left';
        HtmlElement.className = 'alert alert-danger alert-dismissible';
        strong.textContent = message;
    }


    this.wait = function(message) {
        i.className = 'fa fa-circle-o-notch fa-spin fa-lg pull-left';
        HtmlElement.className = 'alert alert-info alert-dismissible';
        strong.textContent = message;
    }

    this.init();

}




/*
 * ========================================================================
 * UI-DropDownList
 * Author  : Yonatan Alexis Quintero Rodriguez
 * Version : 0.1
 * Date    : 6 Oct 2014
 * ========================================================================
 */
/*
 * @param HtmlElement
 * @param items
 */
UI.DropDownList = function(HtmlElement, items) {

    var span = null;
    var input = null;
    var inputHidden = null;
    var i = null;
    var ul = null;
    var oldItemLi = null;
    var currentItemLi = null;
    var disabled = false;
    var UIDropDownList = null;


    this.init = function() {
        UIDropDownList = this;
        HtmlElement.classList.add('dropdownlist');
        HtmlElement.classList.add('background');
        this.create();
        this.fill();        
    }

    this.create = function() {
        span = document.createElement('span');
        input = document.createElement('input');
        ul = document.createElement('ul');
        i = document.createElement('i');
        input.type = 'text';
        input.readOnly = true;
        input.className = 'form-control'
        i.className = 'fa fa-chevron-circle-down';
        input.onchange = function() {
            return true;
        }
        span.appendChild(input);
        span.appendChild(i);

        span.onclick = function() {
            UIDropDownList.toggle();
            
        }
        span.onkeydown = function checkKey(e) {
            e = e || window.event;
            if (e.keyCode === 9) {
                e.preventDefault();
                UIDropDownList.toggle();               
            }
        }
        ul.classList.add('dropdownlist-list');;
        ul.classList.add('hidden');
        inputHidden = document.createElement('input');
        HtmlElement.appendChild(inputHidden);
        inputHidden.type = 'hidden';
        if (HtmlElement.dataset.name !== undefined && HtmlElement.dataset.name !== null) {
            inputHidden.name = HtmlElement.dataset.name;
        }
        HtmlElement.appendChild(span);
        HtmlElement.appendChild(ul);

    }

    this.fill = function() {
        var n = items.length;
        for (var i = 0; i < n; i++) {
            var item = items[i];
            var li = document.createElement('li');
            li.textContent = item.value;
            li.tabIndex = i;
            li.dataset.option = item.option;
            li.onclick = function() {
                UIDropDownList.changeValue(this);
            }
            li.onkeydown = function checkKey(e) {
                e = e || window.event;
                if (e.keyCode === 13) {
                    e.preventDefault();
                    UIDropDownList.changeValue(this);
                }
            }
            ul.appendChild(li);
            if(item.selected){
                this.selectItem(item.option);
            }
        }
    }

    this.selectItem = function(option) {
        var itemsLi = ul.getElementsByTagName('li');
        var n = itemsLi.length;
        if (n > 0) {
            var flag = true;
            var i = 0;
            do {
                var item = itemsLi[i++];
                if (item.dataset.option == option) {
                    oldItemLi = currentItemLi;
                    currentItemLi = item;
                    flag = false;
                }
            } while (flag && i < n);
        }
        input.value = currentItemLi.textContent;
        input.dataset.option = currentItemLi.dataset.option;
        inputHidden.value = currentItemLi.dataset.option;
        currentItemLi.focus();
        if (oldItemLi != null) {
            oldItemLi.classList.remove('selected');
        }
        currentItemLi.classList.add('selected');        
    }

    this.toggle = function() {
        if (!disabled) {
            ul.style.width = span.clientWidth + 'px';
            ul.classList.toggle('hidden');
             currentItemLi.focus();            
        }
    }

    this.changeValue = function(li) {
        oldItemLi = currentItemLi;
        currentItemLi = li;
        input.value = li.textContent;
        input.dataset.option = li.dataset.option;
        inputHidden.value = li.dataset.option;
        input.onchange();
        this.toggle();
        li.classList.add('selected');
        oldItemLi.classList.remove('selected');
    }

    this.addItem = function(option, value) {
        var li = document.createElement('li');
        li.textContent = value;
        li.tabIndex = items.length + 1;
        li.dataset.option = option;
        li.onclick = function() {
            UIDropDownList.changeValue(this);
        }
        li.onkeydown = function checkKey(e) {
            e = e || window.event;
            if (e.keyCode === 13) {
                e.preventDefault();
                UIDropDownList.changeValue(this);
            }
        }       
        ul.appendChild(li);
    }

    this.getItem = function() {
        return {
            value: input.value,
            option: input.dataset.option
        };
    }


    this.getValue = function() {
        return input.value;
    }


    this.getOption = function() {
        return input.dataset.option;
    }

    this.getItemByOption = function (option) {
        var li = getLiByOption(option);
        if (li != null) {
            return {
                value: li.textContent,
                option: li.dataset.option
            };
        }
        return null;
    }

    this.getItemByValue = function (value) {
        var li = getLiByValue(value);
        if (li != null) {
            return {
                value: li.textContent,
                option: li.dataset.option
            };
        }
        return null;

    }

    this.setDisabled = function(_disabled) {
        disabled = _disabled;
        if (disabled) {
            HtmlElement.classList.remove('background');
            HtmlElement.classList.add('disabled');
        } else {
            HtmlElement.classList.remove('disabled');
            HtmlElement.classList.add('background');
        }
    }

    this.onchange = function(callback) {
        input.onchange = callback;
    };

    function getLiByOption(option) {
        var itemsLi = ul.getElementsByTagName('li');
        var n = itemsLi.length;
        var li = null;
        if (n > 0) {
            var flag = true;
            var i = 0;
            do {
                var item = itemsLi[i++];
                if (item.dataset.option == option) {                    
                    li = item;
                    flag = false;
                }
            } while (flag && i < n);
        }
        return li;
    }

    function getLiByValue(value) {
        var itemsLi = ul.getElementsByTagName('li');
        var n = itemsLi.length;
        var li = null;
        if (n > 0) {
            var flag = true;
            var i = 0;
            do {
                var item = itemsLi[i++];
                if (item.textContent === value) {
                    li = item;
                    flag = false;
                }
            } while (flag && i < n);
        }
        return li;
    }

    this.init();

}


/*
 *Name space navbar functions
 **/
var NavBarFn = {};

/*
 * create the navbarheader to the navs when is collapse
 * @param collapse object html
 */
NavBarFn.NavBarHeader = function(collapse) {
    this.htmlElement = document.createElement('div');
    this.button = document.createElement('button');
    this.span = document.createElement('span');
    this.button.classList.add('navbar-toggle');
    this.button.classList.add('collapsed');
    this.span.classList.add('sr-only');
    this.span.textContent = 'Toggle navigation';
    this.button.appendChild(this.span);
    for (var i = 3; i > 0; i--) {
        var span = document.createElement('span');
        span.classList.add('icon-bar');
        this.button.appendChild(span);
    };
    this.button.onclick = function() {
        this.classList.toggle('collapsed');
        collapse.classList.toggle('in');
    }
    this.htmlElement.classList.add('navbar-header');
    this.htmlElement.appendChild(this.button);
}

/*
 * settings options for elements type NavBar
 * @param options
 * @param nav
 * @param ul
 */
NavBarFn.NavBarOptions = function(options, nav, ul) {
    if (options !== undefined) {
        if (options.align === 'right') {
            ul.classList.add('navbar-right');
        }
        if (options.inverse) {
            nav.classList.add('navbar-inverse');
        }
        if (options.type === 'fixed') {
            if (options.position === 'bottom') {
                nav.classList.add('navbar-fixed-bottom');
            } else {
                nav.classList.add('navbar-fixed-top');
            }
        } else if (options.type === 'static') {
            nav.classList.add('navbar-static-top');
        }
    }
}




/*
 * ========================================================================
 * UI-NAVBAR
 * Author  : Yonatan Alexis Quintero Rodriguez
 * Version : 0.1
 * Date    : 6 Oct 2014
 * ========================================================================
 */
/*
 * @param HtmlElement
 * @param link
 * @param links
 * @param options
 */
UI.NavBar = function(HtmlElement, link, links, options) {
    var nav = new Head();
    var n = links.length;

    this.init = function() {
        nav.a.href = link.href;
        nav.a.textContent = link.text;
        for (var i = 0; i < n; i++) {
            var l = links[i];
            var li = document.createElement('li');
            var a = document.createElement('a');
            a.href = l.href;
            a.textContent = l.text;
            if (l.active) {
                li.classList.add('active');
            }
            li.appendChild(a);
            nav.ul.appendChild(li);
        };

        HtmlElement.classList.add('navbar');
        HtmlElement.classList.add('navbar-default');
        NavBarFn.NavBarOptions(options, HtmlElement, nav.ul);
        HtmlElement.appendChild(nav.htmlElement);
    }

    function Head() {
        this.htmlElement = document.createElement('div');
        this.collapse = document.createElement('div');
        this.ul = document.createElement('ul');
        this.navBarHeader = new NavBarFn.NavBarHeader(this.collapse);
        this.a = document.createElement('a');

        this.init = function() {
            this.a.classList.add('navbar-brand');
            this.ul.classList.add('nav');
            this.ul.classList.add('navbar-nav');
            this.navBarHeader.htmlElement.appendChild(this.a);
            this.collapse.classList.add('collapse');
            this.collapse.classList.add('navbar-collapse');
            this.collapse.appendChild(this.ul);
            this.htmlElement.classList.add('container');
            this.htmlElement.appendChild(this.navBarHeader.htmlElement);
            this.htmlElement.appendChild(this.collapse);
        }

        this.init();
    }
    this.init();
}




/*
 * ========================================================================
 * UI-NAVPANEL
 * Author  : Yonatan Alexis Quintero Rodriguez
 * Version : 0.1
 * Date    : 7 Oct 2014
 * ========================================================================
 */
/*
 * @param HtmlElement
 * @param contents
 * @param options
 */
UI.NavPanel = function(HtmlElement, contents, options) {
    var head = new Head();
    var body = new Body();
    var n = contents.length;

    this.init = function() {
        for (var i = 0; i < n; i++) {
            var content = contents[i];
            var id = 'UI-NavPanel-' + content.id;
            var headLi = document.createElement('li');
            var bodyLi = document.createElement('li');
            var a = document.createElement('a');
            var htmlContent = document.getElementById(content.id);
            bodyLi.appendChild(htmlContent);
            bodyLi.id = id;
            if (content.active) {
                headLi.classList.add('active');
                bodyLi.classList.add('active');
            }
            a.href = '#';
            a.dataset.id = id;
            a.textContent = content.text;
            a.onclick = function(e) {
                e.preventDefault();
                var thisLi = this.parentNode;
                var thisOldLi = thisLi.parentNode.getElementsByClassName('active');
                if (thisOldLi.length > 0) {
                    thisOldLi[0].classList.remove('active');
                }
                thisLi.classList.add('active');
                var li = document.getElementById(this.dataset.id);
                var oldLi = li.parentNode.getElementsByClassName('active');
                if (oldLi.length > 0) {
                    oldLi[0].classList.remove('active');
                }
                li.classList.add('active');
            }
            headLi.appendChild(a);
            head.ul.appendChild(headLi);
            body.ul.appendChild(bodyLi);
        };
        NavBarFn.NavBarOptions(options, head.htmlElement, head.ul);
        HtmlElement.classList.add('nav-panel');
        HtmlElement.appendChild(head.htmlElement);
        HtmlElement.appendChild(body.htmlElement);
    }

    function Head() {
        this.htmlElement = document.createElement('nav');
        this.collapse = document.createElement('div');
        this.container = document.createElement('div');
        this.ul = document.createElement('ul');
        this.navBarHeader = new NavBarFn.NavBarHeader(this.collapse);
        this.init = function() {
            this.ul.classList.add('nav');
            this.ul.classList.add('navbar-nav');
            this.htmlElement.classList.add('navbar');
            this.htmlElement.classList.add('navbar-default');
            this.htmlElement.appendChild(this.container);
            this.collapse.classList.add('collapse');
            this.collapse.classList.add('navbar-collapse');
            this.collapse.appendChild(this.ul);
            this.container.classList.add('container-fluid');
            this.container.appendChild(this.navBarHeader.htmlElement);
            this.container.appendChild(this.collapse);
        }

        this.init();
    }

    function Body() {
        this.htmlElement = document.createElement('section');
        this.ul = document.createElement('ul');
        this.init = function() {
            this.ul.classList.add('nav');
            this.htmlElement.classList.add('nav-panel-body');
            this.htmlElement.appendChild(this.ul);
        }
        this.init();
    }
    this.init();
}

/*
 * ========================================================================
 * UI-DropDownPanel
 * Author  : Yonatan Alexis Quintero Rodriguez
 * Version : 0.1
 * Date    : 7 Oct 2014
 * ========================================================================
 */
/*
 * @param HtmlElement
 * @param contents
 * @param options
 */
UI.DropDownPanel = function(HtmlElement, content, options) {
    var id = 'UI-DropDownPanel-' + content.id;
    var head = new Head();
    var body = new Body(content.id);

    this.init = function() {
        head.a.dataset.id = id;
        head.setText(content.text);
        if (content.active) {
            head.li.classList.add('active');
            body.li.classList.add('active');
        }
        body.li.id = id;
        NavBarFn.NavBarOptions(options, head.htmlElement, head.ul);
        HtmlElement.classList.add('nav-panel');
        HtmlElement.appendChild(head.htmlElement);
        HtmlElement.appendChild(body.htmlElement);
    }

    this.setText = function(text) {
        head.setText(text);
    }


     this.onclick = function(callback){
            head.a.onclick = function(){
                
                                this.parentNode.classList.toggle('active');
                document.getElementById(this.dataset.id).classList.toggle('active');
                callback();
            }
        }
    function Head() {
        this.htmlElement = document.createElement('nav');
        this.collapse = document.createElement('div');
        this.container = document.createElement('div');
        this.ul = document.createElement('ul');
        this.navBarHeader = new NavBarFn.NavBarHeader(this.collapse);
        this.ico = document.createElement('span');
        this.li = document.createElement('li');
        this.a = document.createElement('a');

        this.init = function() {
            this.ico.classList.add('caret');
            this.ul.classList.add('nav');
            this.ul.classList.add('navbar-nav');
            this.a.href = '#';
            this.a.onclick = function(e) {
                e.preventDefault();
                this.parentNode.classList.toggle('active');
                document.getElementById(this.dataset.id).classList.toggle('active');
            }
            this.li.appendChild(this.a);
            this.ul.appendChild(this.li);
            this.htmlElement.classList.add('navbar');
            this.htmlElement.classList.add('navbar-default');
            this.htmlElement.appendChild(this.container);
            this.collapse.classList.add('collapse');
            this.collapse.classList.add('navbar-collapse');
            this.collapse.appendChild(this.ul);
            this.container.classList.add('container-fluid');
            this.container.appendChild(this.navBarHeader.htmlElement);
            this.container.appendChild(this.collapse);
        }
        this.setText = function(text) {
            this.a.textContent = text;
            this.a.appendChild(this.ico);
        }


        this.init();
    }

    function Body(id) {
        this.htmlElement = document.createElement('section');
        this.ul = document.createElement('ul');
        this.li = document.createElement('li');
        this.htmlContent = document.getElementById(id);

        this.init = function() {
            this.li.appendChild(this.htmlContent);
            this.ul.appendChild(this.li);
            this.ul.classList.add('nav');
            this.htmlElement.appendChild(this.ul);
            this.htmlElement.classList.add('nav-panel-body');
        }

        this.init();
    }


    this.init();
}
/*
 * ========================================================================
 * UI-NAV-TAB
 * Author  : Yonatan Alexis Quintero Rodriguez
 * Version : 0.1
 * Date    : 9 Oct 2014
 * ========================================================================
 */
/*
 * @param HtmlElement
 * @param contents
 * @param options
 */
 UI.NavTab = function(HtmlElement,contents,options){
    var head = new Head();
    var body = new Body();
    var n = contents.length;

    this.init = function(){
         
        for (var i = 0; i < n; i++) {
            var content = contents[i];
            var id = 'UI-NavTab-' + content.id;
            var headLi = document.createElement('li');
            var bodyLi = document.createElement('li');
            var a = document.createElement('a');
            var htmlContent = document.getElementById(content.id);
            bodyLi.appendChild(htmlContent);
            bodyLi.id = id;
            bodyLi.classList.add('tab-pane');
            if (content.active) {
                headLi.classList.add('active');
                bodyLi.classList.add('active');
            }
            a.href = '#';
            a.dataset.id = id;
            a.textContent = content.text;
            a.onclick = function(e) {
                e.preventDefault();
                var thisLi = this.parentNode;
                var thisOldLi = thisLi.parentNode.getElementsByClassName('active');
                if (thisOldLi.length > 0) {
                    thisOldLi[0].classList.remove('active');
                }
                thisLi.classList.add('active');
                var li = document.getElementById(this.dataset.id);
                var oldLi = li.parentNode.getElementsByClassName('active');
                if (oldLi.length > 0) {
                    oldLi[0].classList.remove('active');
                }
                li.classList.add('active');
            }
            headLi.appendChild(a);
            head.htmlElement.appendChild(headLi);
            body.htmlElement.appendChild(bodyLi);
        };
         HtmlElement.appendChild(head.htmlElement);
         HtmlElement.appendChild(body.htmlElement);
    }

    function Head(){
      this.htmlElement = document.createElement('ul');
      this.init = function(){
          this.htmlElement.classList.add('nav');   
          this.htmlElement.classList.add('nav-tabs');   
      }
      this.init();
    }

    function Body(){
       this.htmlElement = document.createElement('ul');
       this.init = function(){
            this.htmlElement.classList.add('tab-content');
            this.htmlElement.classList.add('reset');
       }
       this.init();
    }

    this.init();
 }
 /*
 * ========================================================================
 * UI-NAV-SCROLL-V
 * Author  : Yonatan Alexis Quintero Rodriguez
 * Version : 0.1
 * Date    : 16 Oct 2014
 * ========================================================================
 */
/*
 * @param HtmlElement
 * @param items[] 
 * @param options{} 
 */
 UI.NavScrollV = function(HtmlElement,items,options){
    var ul = null;
    var itemSelected = null;
    var childSelected = null;
    var bodyRectTop = null;

    function init(){
         ul = document.createElement('ul');
         ul.classList.add('nav-scroll-v');          
         create();
         HtmlElement.appendChild(ul);
         onscroll();
    }

    function create(){
        var n= items.length
         for (var i = 0; i < n; i++) {
             var parent = items[i];
             var parent_li = document.createElement('li');
             parent_li.classList.add('parent');
             var parent_a = document.createElement('a');
             parent_a.href = parent.href;
             parent_a.textContent = parent.text;
             parent_a.dataset.target = parent.target;
             parent_li.appendChild(parent_a);
             var children = parent.children;
             if(children){
                 var children_n = children.length;
                 if(children_n >0){
                    var children_ul = document.createElement('ul');
                    children_ul.classList.add('children');
                    children_ul.classList.add('hidden');
                   for (var j = 0; j < children_n; j++) {
                         var child = children[j];
                         var child_li = document.createElement('li');
                         var child_a = document.createElement('a');
                         child_a.href = child.href;
                         child_a.textContent = child.text;
                         child_a.dataset.target = child.target;
                         child_a.onclick = function(){
                            if(childSelected){
                                childSelected.classList.remove('active');
                            }
                            this.classList.add('active');
                            childSelected = this;
                         }
                         child_li.appendChild(child_a);
                         children_ul.appendChild(child_li);
                   };
                   parent_li.appendChild(children_ul);                     
                 }               
             }
             ul.appendChild(parent_li);
         };
    }

    function calculateBodyTop(){
        bodyRectTop =   document.body.getBoundingClientRect().top || document.documentElement.getBoundingClientRect().top;
        if(options){            
            if(options.top){
               bodyRectTop = bodyRectTop + options.top;               
            }             
        }
    }

    function onscroll(){

     window.onscroll = function(){
             var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;          
             var tmpParents = ul.querySelectorAll('.parent');
             var n= tmpParents.length;
             var i = 0;
             var flag = true;
             calculateBodyTop();
             while (flag && i < n) {
                var tmpParent = tmpParents[i];                 
                var parent_a =  tmpParent.getElementsByTagName('a')[0];
                var target_height = document.getElementById(parent_a.dataset.target).getBoundingClientRect().top -bodyRectTop;    
                if(i === (n-1)){                   
                   if(scrollTop >= target_height){
                        showChildren(tmpParent);
                        readCHildren(tmpParent,scrollTop);
                        flag = false;
                   }
                }else{
                   var tmpNextParent = tmpParents[i+1];
                   var nextParent_a = tmpNextParent.getElementsByTagName('a')[0];
                   var nextTarget_height =  document.getElementById(nextParent_a.dataset.target).getBoundingClientRect().top -bodyRectTop;  
                   if(scrollTop >= target_height && scrollTop <= nextTarget_height){
                        showChildren(tmpParent);
                        readCHildren(tmpParent,scrollTop);
                        flag = false;
                    }
                }
                i++;
            }

     };
}

    function showChildren(parent){
         if(itemSelected){
            itemSelected.classList.add('hidden');
         }
         var ul = parent.getElementsByTagName('ul')[0];
         ul.classList.remove('hidden');
         itemSelected = ul;
    }

    function readCHildren(parent,scrollTop){
         var tmpChildren = parent.querySelectorAll('.children')[0].getElementsByTagName('li');        
         var n= tmpChildren.length;
         var i = 0;
         var flag = true;        
         while (flag && i < n) {
             var tmpChild = tmpChildren[i];               
             var child_a =  tmpChild.getElementsByTagName('a')[0];
             var target_height = document.getElementById(child_a.dataset.target).getBoundingClientRect().top -bodyRectTop;                
             if(i === (n-1)){                 
               if(scrollTop >= target_height){  
                    selectedChild(child_a);
                    flag = false;
               }
            }else{
               var tmpNextChild = tmpChildren[i+1];
               var nextChild_a = tmpNextChild.getElementsByTagName('a')[0];
               var target_height = document.getElementById(child_a.dataset.target).getBoundingClientRect().top -bodyRectTop;
               var nextTarget_height =  document.getElementById(nextChild_a.dataset.target).getBoundingClientRect().top -bodyRectTop;              
               if(scrollTop >= target_height && scrollTop <= nextTarget_height){
                    selectedChild(child_a);  
                    flag = false;
                }
            }
            i++;
        }
    }

    function selectedChild(child_a){
        if(childSelected){
            childSelected.classList.remove('active');
        }
        child_a.classList.add('active');
        childSelected = child_a;

    }
    init();
 }
  /*
 * ========================================================================
 * UI-FORM-OK
 * Author  : Yonatan Alexis Quintero Rodriguez
 * Version : 0.1
 * Date    : 17 Oct 2014
 * ========================================================================
 */
/*
 * @param HtmlElement
 */

 UI.FormOk = function(HtmlElement){
       
        var inputs = null;
        var result = false;
        var changed = false;
        var FormOk = null;
        this.msgRequired = 'This field is required and can\'t be empty!';
        this.msgFullName = 'This field is not a valid name!';
        this.msgEmail = 'This field is not a valid email address!';
        this.msgEquals = 'This field and the field to confirm are not the same!';
        this.msgCheck = 'Plase check!;'
        this.msgAccept = 'Please accept!'
        this.msgMoney = 'This money format is incorrect,please check!';
        this.msgMaxLength = 'Please enter no more than {#} characters!';
        this.msgMinLength = 'Please enter at least {#} characters!';
        this.msgRangeLength = 'Please enter a value between {#min} and {#max} characters long!';
        this.msgMax = 'Please enter a value less than or equal to {#}!';
        this.msgMin = 'Please enter a value greater than or equal to {#}!';
        this.hasSuccess = 'has-success';
        this.hasError = 'has-error';

        function init(){
            FormOk = this;
            inputs = HtmlElement.getElementsByTagName('input');
            var n =inputs.length;
            for (var i = 0; i < n; i++) {           
                var input = inputs[i];       
                var small = document.createElement('small');
                small.className='hidden';           
                input.parentNode.appendChild(small);   
                if(input.dataset.blur ==='true'){               
                    input.onblur = function(){                  
                      return validate(this);
                    }
                }           
                if(input.dataset.keyup ==='true'){              
                    input.onkeyup = function(){         
                        return validate(this);
                    }
                }
            }
        }

        this.isValid = function(){
            var n =inputs.length;
            var i = 0;
            var multiples = new Array();
            var totalMultiple = 1;
            while(i < n ){
                validate(inputs[i++]);
                multiples.push(result ? 1 : 0);
            }
            i = 0;
            while(i < n ){          
                totalMultiple *=multiples[i++];
            }
            return totalMultiple > 0;
        }

        this.hasChanged = function(){
            var n = inputs.length;
            var i = 0;              
            while(i < n && !changed){
                inputs[i++].onchange=function(){
                    changed = true;
                }           
            }       
            var changedAux = changed;
            changed = false;
            return changedAux;
        }

        this.serialize = function(){
            var elements = HtmlElement.elements;
            var serialized = [];
            var i = 0;
            var n = elements.length;
            for (i = 0; i < n; i ++) {
                var element = elements[i];
                var type = element.type;            
                var value = element.value;
                var name = element.name;            
                if(!name.isEmpty()){
                    switch (type) {
                    case 'text':
                    case 'radio':
                    case 'checkbox':                                
                    case 'search':
                    case 'email':
                    case 'url':
                    case 'tel':
                    case 'number':
                    case 'range':
                    case 'date':
                    case 'month':
                    case 'week':
                    case 'time':
                    case 'datetime':
                    case 'datetime-local':
                    case 'color':
                    case 'textarea':
                    case 'password':
                    case 'select':   
                    case 'hidden':  
                        serialized.push(name+'='+value);
                        break;
                    default:
                        break;
                    }
                }
            }
            return serialized.join('&');
        }

        this.toJSON = function(){
            var elements = HtmlElement.elements;  
            var json = {};
            var i=0;        
            var n = elements.length;             
            for (i = 0; i < n; i ++) {
                var element = elements[i];
                var type = element.type;            
                var value = element.value;
                var name = element.name;            
                if(!name.isEmpty()){
                    switch (type) {
                    case 'text':
                    case 'radio':
                    case 'checkbox':                                
                    case 'search':
                    case 'email':
                    case 'url':
                    case 'tel':
                    case 'number':
                    case 'range':
                    case 'date':
                    case 'month':
                    case 'week':
                    case 'time':
                    case 'datetime':
                    case 'datetime-local':
                    case 'color':
                    case 'textarea':
                    case 'password':
                    case 'select':   
                    case 'hidden':                  
                        json[name] = value;
                        break;              
                    }
                }
            }
            return json;
        }

        function validate(input){
              switch (input.type) {      
                  case 'text':
                  case 'search':
                  case 'email':
                  case 'url':
                  case 'tel':
                  case 'number':
                  case 'range':
                  case 'date':
                  case 'month':
                  case 'week':
                  case 'time':
                  case 'datetime':
                  case 'datetime-local':
                  case 'color':
                  case 'textarea':
                  case 'password':                    
                      if(input.dataset.required==='true'){
                          result = this.isNotEmpty(input);
                          if(result){
                              generalValidations(input);
                          }
                      }else{
                          generalValidations(input);
                      }                 
                  break;        
                 case 'radio':
                     break;
                 case 'checkbox':   
                     if(input.dataset.required==='true') result =  this.isChecked(input);
                break;
                default:
                    break;
            }       
        }
        
        function showMessage(input,message){
            var small = input.parentNode.getElementsByTagName('small')[0];
            small.textContent = message;       
            small.className = 'show text-danger';
        } 
        
        function hiddeMessage(input){
            input.parentNode.getElementsByTagName('small')[0].className='hidden'; 
        }

        function success(input){
            if(!input.parentNode.parentNode.classList.contains(this.hasSuccess)){
                input.parentNode.parentNode.classList.add(this.hasSuccess);               
            }
            if(input.parentNode.parentNode.classList.contains(this.hasError)){
                input.parentNode.parentNode.classList.remove(this.hasError);              
            }
            hiddeMessage(input);
            return true;
        }

        function error(input,message){
            if(input.parentNode.parentNode.classList.contains(this.hasSuccess)){
                input.parentNode.parentNode.classList.remove(this.hasSuccess);                
            }
            if(!input.parentNode.parentNode.classList.contains(this.hasError)){
                input.parentNode.parentNode.classList.add(this.hasError);             
            }
            showMessage(input,message);
            return false;
        }



    function generalValidations(){
          if(input.dataset.fullname==='true') result =  this.isFullName(input);
          if(input.dataset.email==='true') result =  this.isEmail(input); 
          if(input.dataset.match!== undefined) result = this.isEquals(document.getElementsByName(input.dataset.match)[0],input);
          if(input.dataset.money==='true') result =  this.isMoney(input); 
          if(input.dataset.maxlength!== undefined) result = this.maxLength(input,input.dataset.maxlength);
          if(input.dataset.minlength!== undefined) result = this.minLength(input,input.dataset.minlength);
    }

    this.isFullName = function(input){        
        if (input.value.match(/^[a-zA-Z][a-zA-Z ]+$/)) return success(input);
        return error(input,this.msgFullName);           
    }
    
    this.isEmail = function(input){
        if (input.value.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/))return FormOk.success(input);
        return error(input, this.msgEmail);            
    }
    
    this.isNotEmpty = function(input){
        if (input.value.match(/^\S+$|[^\s]+$/))return success(input);        
        return error(input, this.msgRequired);
    }    
    
    this.isEquals = function(input,input1){
        if(input.value === input1.value)return success(input) & success(input1);
        return error(input, this.msgEquals) & error(input1, this.msgCheck); 
    }

    this.isMoney = function(input){
        if (input.value.match(/^\d+(,\d{3})*(\.\d*)?$/))return success(input);       
        return error(input, this.msgMoney);
    }

    this.maxLength = function(input,length){
        if(!isNaN(length) && input.value.length <= length) return success(input);
        var msg = this.msgMaxLength.replace('{#}',length);
        return error(input,msg);
    }

    this.minLength = function(input,length){
       if(!isNaN(length) && input.value.length >= length) return success(input);
        var msg = this.msgMinLength.replace('{#}',length);
        return error(input,msg);
    }

    this.rangeLength = function(input,min,max){
       if((!isNaN(min) && input.value.length >= min) && (!isNaN(max) && input.value.length <= max)) return success(input);
        var msg = this.msgRangeLength.replace('{#min}',min).replace('{#max}',max);
        return error(input,msg);
    }    

    this.max = function(input,max){
        if(!isNaN(max) && input.value <= max) return success(input);
        var msg = this.msgMax.replace('{#}',max);
        return error(input,msg);
    }

    this.min = function(input){}
     
    this.range = function(input) {}

    this.isUrl = function(input) {}

    this.isDate = function(input) {}

    this.isNumber = function(input) {}  

    this.isCreditCard = function(input) {}
     
    this.isChecked = function(input){
        if(input.checked) {
            hiddeMessage(input);
            return true
        }
        return error(input, this.msgAccept); 
    }
    

        init();
 }

/*
 * ========================================================================
 * UI-Utils
 * Author  : Yonatan Alexis Quintero Rodriguez
 * Version : 0.1
 * Date    : 6 Oct 2014
 * ========================================================================
 */
UI.ReloadCSS = function(htmlElement, href) {
    var queryString = '?reload=' + new Date().getTime();
    htmlElement.href = href.replace(/\?.*|$/, queryString);
}

UI.Sleep = function(milliseconds){
        var startTime = new Date().getTime();
        while (new Date().getTime() < startTime + milliseconds);
}

Element.prototype.remove = function() {
    this.parentElement.removeChild(this);
}

NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
    for (var i = 0, len = this.length; i < len; i++) {
        if (this[i] && this[i].parentElement) {
            this[i].parentElement.removeChild(this[i]);
        }
    }
}

Element.prototype.moveChildrenTo = function(target) {
    while (this.childNodes.length > 0) {
        target.appendChild(this.childNodes[0]);
    }
    this.remove();
}

Element.prototype.getContentFromFrame = function(){
    return  this.contentDocument || this.contentWindow.document;
}

String.prototype.isEmpty = function () {
    return this == undefined || this === null || this === '' || this.length <= 0;
}



var author = 'Yonatan Alexis Quintero Rodriguez';
var version = '0.1';