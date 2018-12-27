!(function ($) {
    function QuickSelect(select) {
        this.$el = $(select);
        this.$wrapper = '';
        this.init();
    }
    QuickSelect.prototype.init = function () {
        this.resetOption();
        this.createDOM();
        this.addEvent();
    };
    QuickSelect.prototype.createDOM = function () {
        var _this = this;
        var $content = '<div class="button"><span class="button_value" data-value="">请选择品牌</span><img class="button_img" src="images/down.png" alt=""></div><div class="select_content"><ul class="contentList">{{each list value i}}<li id="list_{{i.toLowerCase()}}">{{each value el i}} {{if el.value}}<p data-value="{{el.value}}">{{el.name}}</p>{{else}}<div class="title">{{el.name}}</div>{{/if}} {{/each}}</li>{{/each}}</ul><div class="content_link"><ul>{{each list value i}}<li><span>{{i}}</span></li>{{/each}}</ul></div></div>'
        var $id = this.generates("myContent");
        this.script = document.createElement("script");
        this.script.type = "text/html";
        this.script.id = $id;
        this.script.style.display = "none";
        this.script.innerHTML = $content;
        document.body.appendChild(this.script);
        this.html = template($id,data);
        document.querySelector(".quickSelect--wrapper").innerHTML = this.html;
        this.$wrapper = $(".quickSelect--wrapper");
    };
    QuickSelect.prototype.resetOption = function () {
        var _this = this;
        var $option = '{{each list value i}}{{each value el i}}{{if el.value}}<option value="{{el.value}}">{{el.name}}</option>{{/if}}{{/each}}{{/each}}';
        var $id = this.generates("myOption");
        this.script = document.createElement("script");
        this.script.type = "text/html";
        this.script.id = $id;
        this.script.style.display = "none";
        this.script.innerHTML = $option;
        document.body.appendChild(this.script);
        var options = template($id,data);
        this.$el.hide().empty().append($(options)).after($('<div class="quickSelect--wrapper"></div>'));

    };
    QuickSelect.prototype.addEvent = function () {
        var _this = this;
        this.$wrapper.find(".button").on("click",function (e) {
            $(this).siblings(".select_content").toggle();
            _this.$wrapper.toggleClass("active");

        });
        this.$wrapper.find(".content_link span").on("click",function (e) {
            var $m = e.target.textContent.toLowerCase();
            _this.scrollLi($m);
        });
        $(".contentList p").on("click",function (e) {
            var $text = e.target.textContent.toLowerCase();
            var $value = e.target.getAttribute("data-value");
            var $button = $(this).closest(".select_content").hide().siblings(".button").find("span");
            _this.$wrapper.removeClass("active");
            $button.text($text).attr("data-value",$value);
            _this.$el.val($value).trigger("change");
            //console.log(_this.$el.val());
        });
    };
    QuickSelect.prototype.scrollLi = function (m) {
        var cityListDiv = document.querySelector(".contentList"), tr = document.getElementById("list_" + m);
        if (tr !== null) {
            cityListDiv.scrollTop = tr.offsetTop-10;
        }
    };
    QuickSelect.prototype.generates = function(namespace) {
        var uid = namespace + '-' || 'am-';

        do {
            uid += Math.random().toString(36).substring(2, 7);
        } while (document.getElementById(uid));

        return uid;
    };
    $.fn.QuickSelect = function (e) {
        $(this).each(function (i,el) {
            new QuickSelect(el);
        })
    }
})(jQuery);
$("select[data-quick-select]").QuickSelect();