export const dragOverReceptor = (e) => {
	e.preventDefault()
}

export const dragStart = (e) => {
	const target = e.target
	e.dataTransfer.setData('card_id', target.id)
	e.dataTransfer.setData('card_type', target.attributes.posttype.value)

	setTimeout(() => {
		target.style.display = 'none'
		target.className = 'preview'
	}, 0)
}

export const dragOver = (e) => {
	e.stopPropagation()
}
