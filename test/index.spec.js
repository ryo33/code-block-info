import { expect } from 'chai'

import { getInfo, block, begin, end } from '../src/index.js'

const defaultCategory = '@@code_block_info/defaultCategory'

afterEach(() => {
  $$code_block_info = {}
})

describe('getInfo', () => {
  it('should return an inforation for the default category', () => {
    expect(getInfo()).to.eql([])
    $$code_block_info = {
      other: [1, 2, 3]
    }
    expect(getInfo()).to.eql([])
    $$code_block_info = {
      other: [1, 2, 3],
      [defaultCategory]: [4, 5, 6]
    }
    expect(getInfo()).to.eql([4, 5, 6])
  })

  it('should return an inforation for a category', () => {
    expect(getInfo('category')).to.eql([])
    $$code_block_info = {
      other: [1, 2, 3]
    }
    expect(getInfo('category')).to.eql([])
    $$code_block_info = {
      other: [1, 2, 3],
      category: [4, 5, 6]
    }
    expect(getInfo('category')).to.eql([4, 5, 6])
  })

  it('should return the empty array for any unknown categories', () => {
    expect(getInfo('category1')).to.eql([])
    expect(getInfo()).to.eql([])
  })
})

describe('block', () => {
  it('should call the function with info for the default category', () => {
    expect($$code_block_info).to.eql({})
    block(1, () => {
      expect($$code_block_info).to.eql({
        [defaultCategory]: [1]
      })
      block(2, () => {
        expect($$code_block_info).to.eql({
          [defaultCategory]: [1, 2]
        })
      })
      expect($$code_block_info).to.eql({
        [defaultCategory]: [1]
      })
    })
    expect($$code_block_info).to.eql({
      [defaultCategory]: []
    })
  })

  it('should call the function with info for multiple categories', () => {
    expect($$code_block_info).to.eql({})
    block('category1', 1, () => {
      expect($$code_block_info).to.eql({ category1: [1] })
      block('category2', 2, () => {
        expect($$code_block_info).to.eql({
          category1: [1], category2: [2]
        })
        block('category1', 3, () => {
          expect($$code_block_info).to.eql({
            category1: [1, 3], category2: [2]
          })
        })
        expect($$code_block_info).to.eql({
          category1: [1], category2: [2]
        })
      })
      expect($$code_block_info).to.eql({ category1: [1], category2: [] })
      block('category1', 4, () => {
        expect($$code_block_info).to.eql({
          category1: [1, 4], category2: []
        })
      })
      expect($$code_block_info).to.eql({ category1: [1], category2: [] })
      block(5, () => {
        expect($$code_block_info).to.eql({
          category1: [1], category2: [], [defaultCategory]: [5]
        })
        block('category1', 6, () => {
          expect($$code_block_info).to.eql({
            category1: [1, 6], category2: [], [defaultCategory]: [5]
          })
        })
        expect($$code_block_info).to.eql({
          category1: [1], category2: [], [defaultCategory]: [5]
        })
      })
      expect($$code_block_info).to.eql({
        category1: [1], category2: [], [defaultCategory]: []
      })
    })
    expect($$code_block_info).to.eql({
      category1: [], category2: [], [defaultCategory]: []
    })
  })
})

describe('begin', () => {
  it('should push an inforation for the default category', () => {
    expect($$code_block_info).to.eql({})
    begin(1)
    expect($$code_block_info).to.eql({ [defaultCategory]: [1] })
    begin(2)
    expect($$code_block_info).to.eql({ [defaultCategory]: [1, 2] })
    begin(3)
    expect($$code_block_info).to.eql({ [defaultCategory]: [1, 2, 3] })
  })

  it('should push inforations for multiple categories', () => {
    expect($$code_block_info).to.eql({})
    begin('category1', 1)
    expect($$code_block_info).to.eql({ category1: [1] })
    begin(2)
    expect($$code_block_info).to.eql({
      category1: [1], [defaultCategory]: [2]
    })
    begin('category1', 3)
    expect($$code_block_info).to.eql({
      category1: [1, 3], [defaultCategory]: [2]
    })
    begin('category2', 4)
    expect($$code_block_info).to.eql({
      category1: [1, 3], [defaultCategory]: [2], category2: [4]
    })
  })
})

describe('end', () => {
  it('should push an inforation for the default category', () => {
    $$code_block_info = { [defaultCategory]: [1, 2, 3] }
    end()
    expect($$code_block_info).to.eql({ [defaultCategory]: [1, 2] })
    end()
    expect($$code_block_info).to.eql({ [defaultCategory]: [1] })
    end()
    expect($$code_block_info).to.eql({ [defaultCategory]: []})
  })

  it('should push inforations for multiple categories', () => {
    $$code_block_info = {
      category1: [1, 3], [defaultCategory]: [2], category2: [4]
    }
    end('category2')
    expect($$code_block_info).to.eql({
      category1: [1, 3], [defaultCategory]: [2], category2: []
    })
    end('category1')
    expect($$code_block_info).to.eql({
      category1: [1], [defaultCategory]: [2], category2: []
    })
    end()
    expect($$code_block_info).to.eql({
      category1: [1], [defaultCategory]: [], category2: []
    })
    end('category1')
    expect($$code_block_info).to.eql({
      category1: [], [defaultCategory]: [], category2: []
    })
  })

  it('should not throw error for any unknown categories', () => {
    expect(() => end('category1')).not.to.throw(Error)
    expect(() => end()).not.to.throw(Error)
  })
})
