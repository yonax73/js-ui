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


    this.init = function(option) {
        UIDropDownList = this;
        HtmlElement.classList.add('dropdownlist');
        HtmlElement.classList.add('background');
        this.create();
        this.fill();
        if (option !== undefined) {
            this.selectItem(option);
        }
        this.prueba = option;
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
            currentItemLi.focus();
        }
        span.onkeydown = function checkKey(e) {
            e = e || window.event;
            if (e.keyCode === 9) {
                e.preventDefault();
                UIDropDownList.toggle();
                currentItemLi.focus();
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
                    currentItemLi = item;
                    flag = false;
                }
            } while (flag && i < n);
        }
        input.value = currentItemLi.textContent;
        input.dataset.option = currentItemLi.dataset.option;
        inputHidden.value = currentItemLi.dataset.option;
        currentItemLi.focus();
        currentItemLi.classList.add('selected');
    }

    this.toggle = function() {
        if (!disabled) {
            ul.classList.toggle('hidden');
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



var author = 'Yonatan Alexis Quintero Rodriguez';
var version = '0.1';