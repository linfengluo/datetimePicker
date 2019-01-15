/**
 * Created by linfengluo@gmail.com on 2019/1/14.
 */
'use strict';
import './scss/datetimepicker.scss'
import './lib/iosSelect'
class DateTimePicker {
  constructor(options){
    if (!options.id || options.id.trim() === '') {
      console.error('请输入ID')
      return
    }
    
    this.$el = document.getElementById(options.id)
    if (!this.$el) {
      console.error('无法查找元素')
      return
    }
    
    this._defaultOptions = Object.assign(this._defaultOptions, options)
  
    const _this = this
  
    _this.$el.addEventListener('click', () => {
      _this._initDateTimePicker()
    })
  }
  
  _symbols = {
    time: [':'],
    date: ['年', '月', '日'],
    dateTime: ['年', '月', '日', ':']
  }
  _format = {
    time: 'HH:mm',
    date: 'YYYY年MM月DD日',
    dateTime: 'YYYY年MM月DD日 HH:mm'
  }
  
  _defaultOptions = {
    title: '选择时间',
    itemHeight: 35,
    isShowCancle: true,
    closeText: '取消',
    sureText: '确定',
    showLoading: true,
    isShowAnimate: true,
    className: '',
    type: 'dateTime',
    id: '',
    beginDate: new Date(1990, 1, 1),
    endDate: new Date(new Date().getFullYear() + 10, 12, 31),
    default: new Date(),
    isShowSymbol: true,
    symbols: null,
    format: null,
    disable:function (date) {
      return false
    },
    onSelect(){},
    fallback(){},
    relation: [0, 0, 0, 0, 0, 0]
  }
  
  _initLevel(){
    const level = {
      date: 3,
      dateTime: 5,
      time: 2
    }
    
    return level[this._defaultOptions.type]
  }
  
  _getValue(name){
    return this.$el.getAttribute(`data-${name}`)
  }
  
  _setValue(name, value) {
    return this.$el.setAttribute(`data-${name}`, value)
  }
  
  _initDefaultValue() {
    const year = this._getValue('year') || this._defaultOptions.default.getFullYear()
    const month = this._getValue('month') || this._defaultOptions.default.getMonth()
    const date = this._getValue('date') || this._defaultOptions.default.getDate()
    const hour = this._getValue('hour') || this._defaultOptions.default.getHours()
    const min = this._getValue('min') || this._defaultOptions.default.getMinutes()
    
    if (this._defaultOptions.type === 'date') {
      return [year, month, date, '', '']
    }
    
    if (this._defaultOptions.type === 'time') {
      return [hour, min, '', '', '']
    }
    
    return [year, month, date, hour, min]
  }
  /*
  * 初始化日期选择
  * */
  _initDateTimePicker(){
    const _this = this
    const level = this._initLevel()
    
    const defaultValue = this._initDefaultValue()
    let values = [_this._yearData.bind(_this), _this._monthData.bind(_this), _this._dayData.bind(_this), _this._hourData.bind(_this), _this._minData.bind(_this)]
    
    if (this._defaultOptions.type === 'date') {
      values = [_this._yearData.bind(_this), _this._monthData.bind(_this), _this._dayData.bind(_this)]
    }
  
    if (this._defaultOptions.type === 'time') {
      values = [_this._hourData.bind(_this), _this._minData.bind(_this)]
    }
  
    new IosSelect(level,
      values,
      {
        title: _this._defaultOptions.title,
        addClassName: _this._defaultOptions.className,
        itemHeight: _this._defaultOptions.itemHeight,
        closeText: _this._defaultOptions.closeText,
        sureText: _this._defaultOptions.sureText,
        oneLevelId: defaultValue[0],
        twoLevelId: defaultValue[1],
        threeLevelId: defaultValue[2],
        fourLevelId: defaultValue[3],
        fiveLevelId: defaultValue[4],
        showLoading: _this._defaultOptions.showLoading,
        showSymbol: _this._defaultOptions.isShowSymbol,
        symbols: _this._defaultOptions.isShowSymbol
        ? _this._defaultOptions.symbols
          ? _this._defaultOptions.symbols
          : _this._symbols[_this._defaultOptions.type]
        : [],
        callback: _this._selectedCallback.bind(_this),
        fallback: _this._defaultOptions.fallback,
        showAnimate: _this._defaultOptions.isShowAnimate,
        relation: _this._defaultOptions.relation,
      });
  }
  
  /*
  * 选择日期||时间
  * */
  _selectedCallback(one, two, three, four, five, six) {
    const level = this._initLevel()
    const data = [one, two, three, four, five, six]
    let values = []
    for (let i = 0; i < level; i++) {
      values.push(data[i].value)
    }
    
    if (['date', 'dateTime'].includes(this._defaultOptions.type)) {
      this._setValue('year', values[0])
      this._setValue('mont', values[1])
      this._setValue('date', values[2])
    }
    
    if (this._defaultOptions.type === 'time') {
      this._setValue('hour', values[0])
      this._setValue('min', values[1])
    } else {
      this._setValue('hour', values[3] || '')
      this._setValue('min', values[4] || '')
    }
  
    const format = this._formatDate(values)
    this._defaultOptions.onSelect(values, format)
  }
  
  _formatDate(value){
    const format = this._defaultOptions.format || this._format[this._defaultOptions.type]
    const current = new Date()
    const date = this._defaultOptions.type === 'time'
      ? new Date(current.getFullYear(), current.getMonth(),  current.getDate(), value[0], value[1])
      : this._defaultOptions.type === 'date'
        ? new Date(value[0], value[1], value[2], current.getHours(), current.getMinutes())
        : new Date(value[0], value[1], value[2], value[3], value[4])
    
    let result = format.replace(/YYYY/g, date.getFullYear())
      .replace(/MM/g, date.getMonth())
      .replace(/DD/g, date.getDate())
      .replace(/HH/g, date.getHours())
      .replace(/mm/g, date.getMinutes())
      .replace(/ss/g, date.getSeconds())
      .replace(/\b(\w)\b/g, '0$1')
    
    return result
  }
  
  
  _initYear(){
    const beginYear = this._defaultOptions.beginDate.getFullYear()
    const endYear = this._defaultOptions.endDate.getFullYear()
    let years = []
   
    for (let year = beginYear; year < endYear; year++) {
      if (!this._defaultOptions.disable(new Date(year, 1, 1))) {
        years.push({
          id: year.toString(),
          value: year
        })
      }
    }
    return years
  }
  
  _initMonth(year){
    const endYear = this._defaultOptions.endDate.getFullYear()
    let lastMonth = 12
    if (Number(year) === Number(endYear)) {
      lastMonth = this._defaultOptions.endDate.getMonth()
    }
    let months = []
    for (let month = 1; month <= lastMonth; month++) {
      if (!this._defaultOptions.disable(new Date(year, month, 1))) {
        months.push({
          id: month.toString().replace(/\b(\w)\b/g, '0$1'),
          value: month.toString().replace(/\b(\w)\b/g, '0$1')
        })
      }
    }
    return months
  }
  
  _initDay(year, month){
    const endYear = this._defaultOptions.endDate.getFullYear()
    const endMonth = this._defaultOptions.endDate.getMonth()
    let dayCount = 31
    if (Number(year) === Number(endYear) && Number(month) === Number(endMonth)) {
      dayCount = this._defaultOptions.endDate.getDate()
    } else {
      dayCount = new Date(year, month, 0).getDate()
    }
    
    let days = []
    for (let day = 1; day <= dayCount; day++) {
  
      if (!this._defaultOptions.disable(new Date(year, month, day))) {
        days.push({
          id: day.toString().replace(/\b(\w)\b/g, '0$1'),
          value: day.toString().replace(/\b(\w)\b/g, '0$1')
        })
      }
      
    }
    return days
  }
  
  _initHour(one, two, three){
    let hours = [];
    let year, month, day
    const isHasDate = this._defaultOptions.type !== 'time'
    year = isHasDate ? one : new Date().getFullYear()
    month = isHasDate ? two : new Date().getMonth()
    day = isHasDate ? three : new Date().getDate()
   
    for (let hour = 0,len = 24; hour < len; hour++) {
      if (!this._defaultOptions.disable(new Date(year, month, day, hour))){
        hours.push({
          id: hour.toString().replace(/\b(\w)\b/g, '0$1'),
          value: hour.toString().replace(/\b(\w)\b/g, '0$1')
        });
      }
    }
    return hours;
  }
  
  _initMin(one, two, three, four){
    let mins = [];
    let year, month, day, hour
    const isHasDate = this._defaultOptions.type !== 'time'
    year = isHasDate ? one : new Date().getFullYear()
    month = isHasDate ? two : new Date().getMonth()
    day = isHasDate ? three : new Date().getDate()
    hour = isHasDate ? four : one
    for (let min = 0,len = 60; min < len; min++) {
      if (!this._defaultOptions.disable(new Date(year, month, day, hour, min))){
        mins.push({
          id: min.toString().replace(/\b(\w)\b/g, '0$1'),
          value: min.toString().replace(/\b(\w)\b/g, '0$1')
        });
      }
    }
    return mins
  }
  
  _yearData(callback){
    callback(this._initYear())
  }
  
  _monthData(year, callback){
    callback(this._initMonth(year))
  }
  
  _dayData(year, month, callback){
    callback(this._initDay(year, month))
  }
  _hourData(year, month, day, callback){
    callback ? callback(this._initHour(year, month, day)) : year(this._initHour())
  }
  
  _minData(one, two, three, four, callback){
    callback ? callback(this._initMin(one, two, three, four)) : two(this._initMin(one))
  }
}


if (typeof module != 'undefined' && module.exports) {
  module.exports = DateTimePicker;
}
else if (typeof define == 'function' && define.amd) {
  define(function () {
    return DateTimePicker;
  });
}
else {
  window.DateTimePicker = DateTimePicker;
}
export default DateTimePicker