const scores = document.querySelector('.scores-container')
 
scores.addEventListener('click', (e) => {
    const targetEdit = e.target.closest('.edit')
    if (targetEdit) {
        const row = targetEdit.closest('.score-row')
        const saveBtn = row.querySelector('.save');
        const archerDiv = row.querySelector('.archer');
        const archerName = archerDiv.querySelector('p');
        const scoreDiv = row.querySelector('.score');
        const score = scoreDiv.querySelector('p')
        const dateDiv = row.querySelector('.date');
        const date = dateDiv.querySelector('p')

        archerDiv.innerHTML = `<input value="${archerName.innerText}" name="archer" type="text" required>`
        scoreDiv.innerHTML = `<input value="${score.innerText}" name="score" type="number" required>`
        dateDiv.innerHTML = `<input value="${date.innerText}" name="date" type="date" required>`

        saveBtn.removeAttribute('disabled')
    }
    
    
})

scores.addEventListener('click', (e) => {
    const targetEdit = e.target.closest('.save');
    if (targetEdit) {
        const row = targetEdit.closest('.score-row');
        const archer = row.querySelector('.archer input');
        const score = row.querySelector('.score input')
        const date = row.querySelector('.date input')

        fetch(`/scores/${row.id}/edit`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({ archer: archer.value, score: +score.value, date: date.value })
        }).then(() => window.location.reload())
    }
})

const filter = document.querySelector('#sort-by');

filter.addEventListener('change', () => {
    const option = filter.value
    window.location.assign(`/scores?order=${option}`)
})