## datetimePicker
datetimePicker 时间日期选择 (基于[iosselect](https://github.com/zhoushengmufc/iosselect))

安利一波[iosselect](https://github.com/zhoushengmufc/iosselect)：
> html下拉菜单select在安卓和IOS下表现不一样，iosselect正是为统一下拉菜单样式而生，我们以IOS下select的交互和样式为蓝本，开发了这一组件。


## Demo
[Demo](http://demo.luolinfeng.com/dateTimePicker/)

![Demo](https://image.luolinfeng.com/dateTimePicker/dateTimePicker.png)

## 安装
```
npm i my-datetimeselect -S
```


## 使用
```
new DateTimePicker(options)
```

## 参数（options）
```js
@param String title             标题
@param String className         自定义Class
@param String closeText         取消按钮文字
@param String sureText          确定按钮文字
@param Boolean isShowCancle     是否显示取消按钮
@param Boolean isShowAnimate    是否需要过度动画
@param String type              选择类型(date|dateTime|time) date：日期； dateTime: 日期时间； time: 时间
@param String id                触发元素Id （必填）
@param Date beginDate           选项最小时间
@param Date endDate             选项最大时间
@param Date isShowSymbol        是否显示符号（年月日）
@param Array symbols            符号数组 eg: ['年', '月', '日', ':']
@param String format            格式化时间 eg: 'YYYY-MM-DD HH:mm'
@param Function disable         不需要显示的选项
@param Function onSelect        选择回调 return (Array, String)
@param Function fallback        取消回调
```

## 栗子
```
new DateTimePicker({
  id: 'eleId',
  type: 'date',
  onSelect(val, date) {
    console.log(val, date)
    //['2019', '11', '21'], 2019年11月21日
  },
  disable(data){
    return data.getMinutes() > 30
  }
})

```

## 截图
![Demo](https://image.luolinfeng.com/dateTimePicker/1.png)


![Demo](https://image.luolinfeng.com/dateTimePicker/2.png)


![Demo](https://image.luolinfeng.com/dateTimePicker/3.png)