import { create } from 'zustand';

const usePhoneBookStore = create((set, get) => ({
  phoneBook: [],
  searchTerm: '',
  searchResults: [],
  addContact: (name, phoneNumber) =>
    set((state) => {
      const newPhoneBook = [...state.phoneBook, { id: Date.now(), name, phoneNumber }];
      // 연락처 추가 후 searchResults를 전체 phoneBook으로 업데이트
      return {
        phoneBook: newPhoneBook,
        searchResults: newPhoneBook,
        searchTerm: '', // 검색어 초기화 (선택 사항)
      };
    }),
  setSearchTerm: (term) => set({ searchTerm: term }),
  searchContacts: () => {
    const term = get().searchTerm;
    const results = get().phoneBook.filter(contact =>
      contact.name.toLowerCase().includes(term.toLowerCase()) ||
      contact.phoneNumber.includes(term)
    );
    set({ searchResults: results });
  },
}));

export default usePhoneBookStore;