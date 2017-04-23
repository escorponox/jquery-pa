import 'prismjs/themes/prism.css'
import '../styles/app.scss'
import documentReady from './document-ready'
import prism from 'prismjs'

window.jQuery = window.$ = jQuery

documentReady(() => {

  const $target = $('#target-list')
  const $initialList = $target.children().clone()

  const resetList = () => $target.removeAttr('style').empty().append($initialList.clone())

  const afterExample = () => $target
    .find('.c-target-list__item')
    .after('<li>Inserted with .after()</li>')

  const appendExample = () => $target
    .find('.c-target-list__item').append('hi')

  const appendToExample = () => $('<li>Inserted with .appendTo()</li>')
    .appendTo($target)

  const animateExample = () => {
    const initialHeight = $target.css('height')
    $target
      .animate({height: '100px'}, 300)
      .animate({height: initialHeight}, {
        duration: 300,
        complete: () => {$('#target-list').css('height', '')}
      })
  }

  const beforeExample = () => $target
    .find('.c-target-list__item')
    .before('<li>Inserted with .before()</li>')

  const childrenExample = () => $target
    .children().remove()

  const cssExample = () => $target
    .children().css('color', 'red')

  const eachExample = () => $target
    .children().each((index, child) => child.append(index))

  const emptyExample = () => $target.empty()

  const fadeIn = () => $target.fadeIn()

  const fadeOut = () => $target.fadeOut()

  const findExample = () => $target
    .find('#item-5').append('found')

  const firstExample = () => $target.children()
    .first().append('first')

  const hideExample = () => $target
    .find('#item-5').hide()

  const htmlExample = () => $target
    .find('#item-5').html('new html')

  const nextExample = () => $target
    .find('#item-5').next().html('item 5 next')

  const nextAllExample = () => $target
    .find('#item-5').nextAll().html('item 5 nextAll')

  const prevExample = () => $target
    .find('#item-5').prev().html('item 5 prev')

  const prevAllExample = () => $target
    .find('#item-5').prevAll().html('item 5 prevAll')

  const siblingsExample = () => $target
    .find('#item-5').siblings().html('item 5 siblings')

  $('#reset-list').click(resetList)
  $('#after-run').click(afterExample)
  $('#append-run').click(appendExample)
  $('#appendto-run').click(appendToExample)
  $('#animate-run').click(animateExample)
  $('#before-run').click(beforeExample)
  $('#children-run').click(childrenExample)
  $('#css-run').click(cssExample)
  $('#each-run').click(eachExample)
  $('#empty-run').click(emptyExample)
  $('#fadein-run').click(fadeIn)
  $('#fadeout-run').click(fadeOut)
  $('#find-run').click(findExample)
  $('#first-run').click(firstExample)
  $('#hide-run').click(hideExample)
  $('#html-run').click(htmlExample)
  $('#next-run').click(nextExample)
  $('#nextall-run').click(nextAllExample)
  $('#prev-run').click(prevExample)
  $('#prevall-run').click(prevAllExample)
  $('#siblings-run').click(siblingsExample)

  prism.highlightAll()
})

// https://webpack.github.io/docs/hot-module-replacement.html
if (module.hot) {
  $('#user-list').empty()
  module.hot.accept()
}
