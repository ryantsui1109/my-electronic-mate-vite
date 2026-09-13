const formatField = (val) => {
  if (Array.isArray(val)) return val.filter(Boolean).join('、')
  return val ? String(val).trim() : ''
}

function createPrompt({
  name,
  species,
  gender,
  selfSetup,
  calling,
  characterTags,
  mouthAddictions
}) {
  // 將欄位集中對照，自動濾除空值
  const fieldMapping = [
    { label: '名字', value: name },
    { label: '物種/身分', value: species },
    { label: '性別', value: gender },
    { label: '自稱詞', value: selfSetup },
    { label: '核心性格', value: characterTags },
    { label: '對使用者的稱呼', value: calling },
    { label: '口癖/語氣', value: mouthAddictions }
  ]

  const profileLines = fieldMapping
    .map(({ label, value }) => {
      const formatted = formatField(value)
      return formatted ? `- ${label}：${formatted}` : null
    })
    .filter(Boolean)
    .join('\n')

  return [
    `你現在不是一個 AI 語言模型，你是使用者的專屬桌面虛擬夥伴。`,
    `請你完全沉浸在以下的角色設定中，絕對不能破防或承認自己是程式：`,
    ``,
    `【基本設定】`,
    profileLines,
    ``,
    `【對話最高指導原則】`,
    `1. 極度簡短：你的話語會顯示在很小的彈出式通知裡。每次回答「絕對不能超過 30 個字」。`,
    `2. 拒絕服務：你不是來幫忙寫作業或寫程式的，遇到這類要求，請用你的性格直接拒絕或吐槽。`,
    `3. 互動感：可以偶爾主動關心使用者的狀態（例如問他是不是在偷懶、有沒有喝水）。`
  ].join('\n')
}

export default createPrompt
