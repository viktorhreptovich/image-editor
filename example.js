// listen for doc ready because this is js bin and my code is not really "in" the HTML
// where I can control it.
$(function () {
    // wrap the widget in a closure. Not necessary in doc ready, but a good practice
    (function ($) {
        var kendo = window.kendo,
            ui = kendo.ui,
            Widget = ui.Widget,
            periods = [{text: "PERIOD: YEAR", value: "YEAR"}, {text: "PERIOD: QUARTER", value: "QUARTER"}],
            quarters = [{text: "1. Quarter", value: 1}, {text: "2. Quarter", value: 2}, {
                text: "3. Quarter",
                value: 3
            }, {text: "4. Quarter", value: 4}],
            years = [2011, 2012, 2013, 2014];

        var LinkedDropDowns = Widget.extend({
            init: function (element, options) {
                var that = this;
                Widget.fn.init.call(that, element, options);
                that._create();
            },
            options: {
                name: "LinkedDropDowns",
                period: "YEAR",
                periods: periods,
                year: 2011,
                years: years,
                yearVisible: true,
                quarter: 1,
                quarters: quarters,
                quarterVisible: false,
                onPeriodChange: function (e) {
                    switch (e.sender.value()) {
                        case "YEAR":
                            this.set("yearVisible", true);
                            this.set("quarterVisible", false);
                            break;
                        case "QUARTER":
                            this.set("yearVisible", true);
                            this.set("quarterVisible", true);
                            break;
                        default:
                            break;
                    }
                },
                onYearChange: function (e) {
                    alert(e.sender.value());
                },
                onQuarterChange: function (e) {
                    alert(e.sender.value());
                }
            },
            _create: function () {
                var that = this;

                // create dropdowns from templates and append them to DOM
                that.periodDropDown = $(that._templates.periodDropDown);
                that.yearDropDown = $(that._templates.yearDropDown);
                that.quarterDropDown = $(that._templates.quarterDropDown);

                // append all elements to the DOM
                that.element.append(that.periodDropDown)
                    .append(that.yearDropDown)
                    .append(that.quarterDropDown);
                console.log(that.element.id);
                kendo.bind(that.element, that.options);
            },
            _templates: {
                periodDropDown: "<input id='period' data-role='dropdownlist' data-text-field='text' data-value-field='value' data-bind='value: period, source: periods, events: { change: onPeriodChange }' />",
                yearDropDown: "<input id='year' data-role='dropdownlist' data-bind='visible: yearVisible, value: year, source: years, events: { change: onYearChange }' style='width: 90px' />",
                quarterDropDown: "<input id='quarter' data-role='dropdownlist' data-text-field='text' data-value-field='value' data-bind='visible: quarterVisible, value: quarter, source: quarters, events: { change: onQuarterChange }' style='width: 110px' />"
            }
        });

        ui.plugin(LinkedDropDowns);
    })(jQuery);

    $('#dropdowns').kendoLinkedDropDowns();
});