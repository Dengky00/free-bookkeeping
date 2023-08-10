import { faker } from '@faker-js/faker'
import { AxiosRequestConfig } from 'axios'

type Mock = (config: AxiosRequestConfig) => [number, any]
faker.setLocale('zh_CN')

//模拟登录
export const mockSession: Mock = (config) => {
  return [
    200,
    {
      jwt: faker.random.word(),
    },
  ]
}

//模拟编辑已存在的标签信息
export const mockTagShow: Mock = (config) => {
  const createTag = (attrs?: any) => ({
    id: createId(),
    name: faker.lorem.word(),
    sign: faker.internet.emoji(),
    ...attrs,
  })
  return [200, { resource: createTag() }]
}

//模拟提交编辑完成的标签信息
export const mockTagEdit: Mock = (config) => {
  const createTag = (attrs?: any) => ({
    id: createId(),
    name: faker.lorem.word(),
    sign: faker.internet.emoji(),
    ...attrs,
  })
  return [200, { resource: createTag() }]
}

let id = 0 //tagId
const createId = () => {
  id += 1
  return id
}
//模拟已创建的记账标签
export const mockTagIndex: Mock = (config) => {
  const { kind, page } = config.params
  const per_page = 25
  const count = 26
  const createPaper = (page = 1) => ({
    page,
    per_page,
    count,
  })
  const createBody = (n = 1, attrs?: any) => ({
    resources: createTag(n),
    pager: createPaper(page),
  })
  //随机生成标签,模拟服务器数据
  const createTag = (n = 1, attrs?: any) =>
    Array.from({ length: n }).map(() => ({
      id: createId(),
      name: faker.lorem.word(),
      sign: faker.internet.emoji(),
      kind: config.params.kind,
      ...attrs,
    }))
  if (kind === 'expense' && (!page || page === 1)) {
    return [200, createBody(25)]
  } else if (kind === 'expense' && page === 2) {
    return [200, createBody(1)]
  } else if (kind === 'income' && (!page || page === 1)) {
    return [200, createBody(25)]
  } else {
    return [200, createBody(1)]
  }
}

//模拟提交记账数据
export const mockItemCreate: Mock = (config) => {
  return [
    200,
    {
      resource: {
        id: 2264,
        user_id: 1312,
        amount: 9900,
        note: null,
        tags_id: [3508],
        happen_at: '2020-10-29T16:00:00.000Z',
        created_at: '2022-07-03T15:35:56.301Z',
        updated_at: '2022-07-03T15:35:56.301Z',
        kind: 'expenses',
      },
    },
  ]
}

//模拟读取记账记录
export const mockItemIndex: Mock = (config) => {
  const { kind, page } = config.params
  const per_page = 25
  const count = 26
  const createPaper = (page = 1) => ({
    page,
    per_page,
    count,
  })
  const createTag = (attrs?: any) => ({
    id: createId(),
    name: faker.lorem.word(),
    sign: faker.internet.emoji(),
    kind: 'expenses',
    ...attrs,
  })
  const createItem = (n = 1, attrs?: any) =>
    Array.from({ length: n }).map(() => ({
      id: createId(),
      user_id: createId(),
      amount: Math.floor(Math.random() * 10000),
      tags_id: [createId()],
      tags: [createTag()],
      happen_at: faker.date.past().toISOString(),
      kind: config.params.kind,
    }))
  const createBody = (n = 1, attrs?: any) => ({
    resources: createItem(n),
    pager: createPaper(page),
  })
  if (!page || page === 1) {
    return [200, createBody(25)]
  } else if (page === 2) {
    return [200, createBody(1)]
  } else {
    return [200, {}]
  }
}
//模拟收支平衡总情况
export const mockItemIndexBalance: Mock = (config) => {
  return [
    200,
    {
      expenses: 9900,
      income: 9900,
      balance: 0,
    },
  ]
}
//模拟记账记录的详细图表数据
export const mockItemSummary: Mock = (config) => {
  if (config.params.group_by === 'happen_at') {
    return [
      200,
      {
        groups: [
          { happen_at: '2023-08-06T00:00:00+08:00', amount: 100 },
          { happen_at: '2023-08-13T00:00:00+08:00', amount: 300 },
          { happen_at: '2023-08-27T00:00:00+08:00', amount: 200 },
        ],
        summary: 600,
      },
    ]
  } else {
    return [
      200,
      {
        groups: [
          { tag_id: 1, tag: { id: 1, name: '交通' }, amount: 100 },
          { tag_id: 2, tag: { id: 2, name: '吃饭' }, amount: 300 },
          { tag_id: 3, tag: { id: 3, name: '购物' }, amount: 200 },
        ],
        summary: 600,
      },
    ]
  }
}
