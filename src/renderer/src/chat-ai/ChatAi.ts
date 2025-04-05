export class ChatAi {
  private role: 'system' | 'user' | 'assistant'
  private content: string

  constructor(parameter: ParameterBuatChatAi = {}) {
    this.role = parameter.role ?? 'user'
    this.content = parameter.content ?? ''
  }

  bungkus(): any {
    return {
      role: this.role,
      content: this.content
    }
  }
}

interface ParameterBuatChatAi {
  role?: 'system' | 'user' | 'assistant'
  content?: string
}
