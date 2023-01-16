// require('@/bootstrap')

import React from 'react'
import ReactDOM from 'react-dom'
import AlbumListPage from '../components/albumListPage/AlbumListPage'

if (document.getElementById('divMainContainer')) {
	ReactDOM.render(
		<AlbumListPage />,
		document.getElementById('divMainContainer')
	)
}
