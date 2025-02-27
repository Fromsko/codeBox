import request from '@/utils/request'
import { defineStore } from 'pinia'

interface InviteState {
  inviteCode: string
  loading: boolean
}

export const useInviteStore = defineStore('invite', {
  state: (): InviteState => ({
    inviteCode: '',
    loading: false,
  }),
  actions: {
    async submitInviteCode() {
      this.loading = true
      try {
        const response = await request.post('/api/invite', {
          code: this.inviteCode,
        })
        this.loading = false
        return response
      } catch (error) {
        this.loading = false
        throw error
      }
    },
    setInviteCode(code: string) {
      this.inviteCode = code
    },
  },
})
