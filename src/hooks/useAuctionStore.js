import { create } from 'zustand'
import { AUCTION_LISTINGS, BID_INCREMENTS } from '../data/listings'

function getIncrement(bid) {
  const tier = BID_INCREMENTS.find(t => bid >= t.from && bid < t.to)
  return tier ? tier.increment : 500
}

function generateBidHistory(currentBid, numBids) {
  const users = ['B***r1', 'K***n7', 'T***s3', 'M***e9', 'C***l5', 'S***h2', 'A***n8', 'R***k4']
  const items = []
  let bid = currentBid
  for (let i = 0; i < Math.min(numBids, 10); i++) {
    const mins = i * 3 + Math.floor(Math.random() * 3)
    items.push({ user: users[i % users.length], amount: bid, time: `${mins}m ago` })
    bid -= getIncrement(bid - getIncrement(bid))
    if (bid < 0) break
  }
  return items
}

const useAuctionStore = create((set, get) => ({
  auctions: AUCTION_LISTINGS.map(a => ({
    ...a,
    timeRemaining: a.endSeconds,
    bidHistory: generateBidHistory(a.currentBid, a.bids),
  })),
  watchlist: [],
  user: null,
  isLoggedIn: false,

  // Tick all timers down
  tick: () => set(state => ({
    auctions: state.auctions.map(a => ({
      ...a,
      timeRemaining: Math.max(0, a.timeRemaining - 1),
    })),
  })),

  // Place a bid on an auction
  placeBid: (auctionId, amount) => {
    const state = get()
    const auction = state.auctions.find(a => a.id === auctionId)
    if (!auction) return { success: false, message: 'Auction not found' }
    const minBid = auction.currentBid + getIncrement(auction.currentBid)
    if (amount < minBid) return { success: false, message: `Minimum bid is €${minBid.toLocaleString()}` }

    set(state => ({
      auctions: state.auctions.map(a => {
        if (a.id !== auctionId) return a
        const extended = a.timeRemaining < 120 ? a.timeRemaining + 120 : a.timeRemaining
        return {
          ...a,
          currentBid: amount,
          bids: a.bids + 1,
          timeRemaining: extended,
          reserveMet: amount >= a.reservePrice,
          bidHistory: [
            { user: 'You', amount, time: 'just now' },
            ...a.bidHistory.slice(0, 9),
          ],
        }
      }),
    }))
    return { success: true, message: `Bid of €${amount.toLocaleString()} placed successfully!` }
  },

  // Simulate incoming bids from other users
  simulateBid: (auctionId) => {
    const state = get()
    const auction = state.auctions.find(a => a.id === auctionId)
    if (!auction || auction.timeRemaining === 0) return
    const users = ['B***r1', 'K***n7', 'T***s3', 'M***e9', 'C***l5']
    const newBid = auction.currentBid + getIncrement(auction.currentBid)
    set(state => ({
      auctions: state.auctions.map(a => {
        if (a.id !== auctionId) return a
        return {
          ...a,
          currentBid: newBid,
          bids: a.bids + 1,
          reserveMet: newBid >= a.reservePrice,
          bidHistory: [
            { user: users[Math.floor(Math.random() * users.length)], amount: newBid, time: 'just now' },
            ...a.bidHistory.slice(0, 9),
          ],
        }
      }),
    }))
    return newBid
  },

  toggleWatchlist: (auctionId) => set(state => {
    const inList = state.watchlist.includes(auctionId)
    return { watchlist: inList ? state.watchlist.filter(id => id !== auctionId) : [...state.watchlist, auctionId] }
  }),

  login: (email, password) => {
    // Mock login — any email/password works
    if (email && password) {
      set({ isLoggedIn: true, user: { email, name: 'John Murphy', initials: 'JM' } })
      return { success: true }
    }
    return { success: false, message: 'Invalid credentials' }
  },

  register: (data) => {
    if (data.email && data.password && data.name) {
      set({ isLoggedIn: true, user: { email: data.email, name: data.name, initials: data.name.split(' ').map(n => n[0]).join('').toUpperCase() } })
      return { success: true }
    }
    return { success: false, message: 'Please fill in all required fields' }
  },

  logout: () => set({ isLoggedIn: false, user: null }),

  getAuction: (id) => get().auctions.find(a => a.id === parseInt(id)),
  getIncrement,
  getMinBid: (id) => {
    const a = get().auctions.find(a => a.id === parseInt(id))
    return a ? a.currentBid + getIncrement(a.currentBid) : 0
  },
}))

export default useAuctionStore
