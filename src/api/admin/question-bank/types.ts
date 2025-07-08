type QuestionBank = {
    createTime?: string
    description?: string
    editTime?: string
    id?: number
    isDelete?: number
    picture?: string
    title?: string
    updateTime?: string
    userId?: number
}
type QuestionBankQueryRequest = {
    current?: number
    description?: string
    id?: number
    needQueryQuestionList?: boolean
    notId?: number
    pageSize?: number
    picture?: string
    searchText?: string
    sortField?: string
    sortOrder?: string
    title?: string
    userId?: number
}

type QuestionBankDeleteRequest = {
    id: number
}

type QuestionBankUpdateRequest = {
    description?: string
    id?: number
    picture?: string
    title?: string
}
type QuestionBankAddRequest = {
    description?: string
    picture?: string
    title?: string
}

export type { QuestionBank, QuestionBankQueryRequest, QuestionBankDeleteRequest, QuestionBankUpdateRequest, QuestionBankAddRequest }
