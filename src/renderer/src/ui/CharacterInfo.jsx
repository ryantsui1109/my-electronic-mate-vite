import { Form } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import { InputGroup } from 'react-bootstrap'
import { Badge } from 'react-bootstrap'
import { useEffect, useRef, useState } from 'react'

function CharacterInfo() {
  const [characterTags, setCharacterTags] = useState([])
  const [mouthAddictions, setMouthAddictions] = useState([])
  const characterTag = useRef(null)
  const mouthAddiction = useRef(null)
  const formRef = useRef(null)

  useEffect(() => {
    async function getCharacterInfo() {
      const ci = await window.electronStore.get('characterInfo')
      setCharacterTags(ci.characterTags || [])
      setMouthAddictions(ci.mouthAddictions || [])
      delete ci.characterTags
      delete ci.mouthAddictions
      Object.entries(ci).forEach(([key, value]) => {
        formRef.current.elements[key].value = value || ''
      })
    }

    getCharacterInfo()
  }, [])

  function handleAddTag() {
    const newTags = [...characterTags]
    newTags.push(characterTag.current.value)
    console.log(characterTag.current.value)
    characterTag.current.value = ''
    setCharacterTags(newTags)
    characterTag.current.focus()
  }

  function handleRemoveTag(index) {
    const newTags = [...characterTags]
    newTags.splice(index, 1)
    setCharacterTags(newTags)
  }

  function handleAddMATag() {
    const newTags = [...mouthAddictions]
    newTags.push(mouthAddiction.current.value)
    mouthAddiction.current.value = ''
    setMouthAddictions(newTags)
    mouthAddiction.current.focus()
  }

  function handleRemoveMATag(index) {
    const newTags = [...mouthAddictions]
    newTags.splice(index, 1)
    setMouthAddictions(newTags)
  }

  function handleSubmit(e) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    let characterInfo = {}
    for (const p of fd.entries()) {
      characterInfo[p[0]] = p[1]
    }
    characterInfo['characterTags'] = characterTags
    characterInfo['mouthAddictions'] = mouthAddictions
    console.log(characterInfo)
    window.electronStore.set('characterInfo', characterInfo)
  }

  return (
    <>
      <Form id="character-info" ref={formRef} onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>名字</Form.Label>
          <Form.Control type="text" name="name" placeholder="輸入桌寵名字" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicSpecies">
          <Form.Label>物種</Form.Label>
          <Form.Control type="text" name="species" placeholder="輸入桌寵物種" />
          <Form.Text className="text-muted">EX:人類、貓貓、蟑螂</Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicGender">
          <Form.Label>性別</Form.Label>
          <Form.Control type="text" name="gender" placeholder="輸入桌寵性別" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicTags">
          <Form.Label>性格</Form.Label>
          <InputGroup>
            <Form.Control ref={characterTag} placeholder="添加性格關鍵字" />

            <Button variant="primary" id="button-addon1" onClick={handleAddTag}>
              <i className="bi bi-plus-lg" />
            </Button>
          </InputGroup>
          <Form.Text>
            {characterTags.map((tag, index) => (
              <Badge key={tag} className="me-2">
                {tag}
                <i
                  className="bi bi-x"
                  onClick={() => {
                    handleRemoveTag(index)
                  }}
                />
              </Badge>
            ))}
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicSelfSetup">
          <Form.Label>自稱</Form.Label>
          <Form.Control type="text" name="selfSetup" placeholder="輸入桌寵自稱詞" />
          <Form.Text className="text-muted">EX:我、人家、本可、老娘</Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCalling">
          <Form.Label>對使用者的稱呼</Form.Label>
          <Form.Control type="text" name="calling" placeholder="輸入桌寵對使用者的稱呼" />
          <Form.Text className="text-muted">EX:你、您、人類、雜魚</Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicTags">
          <Form.Label>口癖</Form.Label>
          <InputGroup>
            <Form.Control ref={mouthAddiction} placeholder="添加口癖的描述" />

            <Button variant="primary" id="button-addon1" onClick={handleAddMATag}>
              <i className="bi bi-plus-lg" />
            </Button>
          </InputGroup>
          <Form.Text className="text-muted">EX:講話時以喵結尾、喜歡用顔文字、經常嘆氣</Form.Text>
          <br />
          <Form.Text>
            {mouthAddictions.map((tag, index) => (
              <Badge key={tag} className="me-2">
                {tag}
                <i
                  className="bi bi-x"
                  onClick={() => {
                    handleRemoveMATag(index)
                  }}
                />
              </Badge>
            ))}
          </Form.Text>
        </Form.Group>
      </Form>
      <div className="w-100 text-end mb-3">
        <Button type="submit" form="character-info">
          儲存
        </Button>
      </div>
    </>
  )
}

export default CharacterInfo
