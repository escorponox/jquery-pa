import styles from '../styles/app.scss'
import documentReady from './document-ready'

window.jQuery = window.$ = jQuery

documentReady(() => {
  const $userList = $('#user-list')
  const $userDetails = $('#user-details')
  const $userDetailsContainer = $('#user-details-container')
  const $clearButton = $('#clear-button')
  let users, activeUser

  $.getJSON('users.json', usersData => {
    users = usersData
    $.each(usersData, (index, user) => {
      $('<div>').addClass(user.address ? 'c-users__user has-address' : 'c-users__user')
        .append($('<span>').addClass('c-users__id').text(user.id))
        .append($('<span>').addClass('c-users__name').text(user.name))
        .append($('<span>').addClass('c-users__email').text(user.email))
        .appendTo($userList)
    })

    $userList.find('.has-address').prependTo($userList)
  })

  const selectUser = event => {
    const $user = $(event.currentTarget)
    $user.addClass('is-selected').siblings().removeClass('is-selected')
    $user.trigger('user-selected', {
      id: Number($user.find('.c-users__id').text())
    })
  }

  $userList.on('click', '.c-users__user', selectUser)

  const extractInfo = value => {
  if (typeof value !== 'object') {
    return $('<span>').addClass('c-user-details__value').text(value)
  }
  const $infoPack = $('<ul>')
  $.each(value, (key, value) => {
    $('<li>')
      .append($('<span>').addClass('c-user-details__key').text(key + ': '))
      .append(extractInfo(value))
      .appendTo($infoPack)
  })
  return $infoPack
}

  const showDetails = (event, userId) => {

    if (activeUser !== userId.id) {
      activeUser = userId.id
      $userDetails.empty()
      const user = users.find(user => user.id === userId.id)
      $.each(user, (key, value) => {
        $('<li>')
          .append($('<span>').addClass('c-user-details__key').text(key + ': '))
          .append(extractInfo(value))
          .appendTo($userDetails)
      })

      $userDetailsContainer.addClass('is-active')
    }
  }

  const clearInfo = event => {
    activeUser = undefined
    $userDetailsContainer.removeClass('is-active')
    $userList.find('.is-selected').removeClass('is-selected')
  }

  $(document).on('user-selected', showDetails)
  $clearButton.on('click', clearInfo)
})

// https://webpack.github.io/docs/hot-module-replacement.html
if (module.hot) {
  $('#user-list').empty()
  module.hot.accept()
}
