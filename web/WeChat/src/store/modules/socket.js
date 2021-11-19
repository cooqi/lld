import Socket from '@/socket'
import _ from 'lodash'
import { db } from '@/utils/indexedDB'

const state = {
  socket_msg: [], // 即时消息
  ws: null, // websorket实例
  db_history_msg: []// 历史消息
}

const mutations = {
  web_socket_msg: (state, data) => { // 实时聊天记录缓存
    console.log('data', data)
    const msgId = data.who == 'I' ? data.toId : data.who == 'YOU' ? data.fromId : data.toId
    if (_.some(state.socket_msg, ['uid', msgId])) {
      // 已有对话存在,直接存值
      state.socket_msg = state.socket_msg.map(item => {
        if (item.uid == msgId) {
          // todo 状态的替换
          for (let i = 0; i < item.msg.length; i++) {
            if (item.msg[i].msgUnique == data.msgUnique) {
              item.msg[i] = data
            }
          }
          // item.msg.push(data)
        }
        return item
      })
    } else {
      // 没有历史对话，存一个user记录
      const item = {
        uid: msgId,
        msg: []
      }
      item.msg.push(data)
      state.socket_msg.push(item)
    }
  },
  contentSocket (state, { commit }) {
    state.ws = new Socket(commit)
  },
  history_msg: (state, msg) => { // 历史聊天记录存储
    state.db_history_msg = msg
  },
  clearAllMsg: (state) => { // 清空所有
    state.socket_msg = []
    state.db_history_msg = []
    db.deleteAll()
  },
  clearSocketMsg: (state) => { // 清空即时聊天
    state.socket_msg = []
  }

}

const actions = {
// 创建实例
  socketInit ({ commit, state }) {
    commit('contentSocket', { commit })
  },
  save ({ commit, state }, data) { // 保存所有消息
    commit('web_socket_msg', data)
    db.save(data, () => {
      console.log('存db成功')
    })
  },
  saveSuccesse ({ dispatch }, data) { // 保存成功的消息
    // data.statue = 1
    // dispatch('save', data)
    db.getAll((history_msg) => { // 取db里的历史数据
      const arr = history_msg.filter(val => { // 过滤是否已存在
        // todo
        return val.msgUnique == data.msgUnique
      })
      if (arr.length) { // 存在，就把当前数据id赋值，因为有id才代表更新，否则就是新增
        data.id = arr[0].id
      }
      data.statue = 1
      dispatch('save', data)
    })
  },
  getAllDB ({ commit, state }) { // 获取存在DB里面的历史消息
    return new Promise((resolve, reject) => {
      db.getAll((data) => {
        commit('history_msg', data)
        resolve(data)
      })
    })
  },
  readMsg: ({ commit, state, dispatch }, data) => { // 已读
    if (!data.length) return false
    data.map(item => {
      db.getAll((history_msg) => { // 取db里的历史数据
        const arr = history_msg.filter(val => { // 过滤是否已存在
          // todo msgUnique是唯一标识
          return val.chatId == item.chatId
        })
        if (arr.length) { // 存在，就把当前数据id赋值，因为有id才代表更新，否则就是新增
          item.id = arr[0].id
        }
        item.read = 1
        db.save(item)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
