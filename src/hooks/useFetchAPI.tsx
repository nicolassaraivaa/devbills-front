import { Category, Dashboard, FinancialEvolution, Transaction } from "../services/api-types.ts";
import { APIService } from "../services/api.ts";
import { formatDate } from "../utils/format-date.ts";
import { CreateCategoryData, CreateTransactionData, financialEvolutionFilterData, TransactionFilterData } from "../validators/types.ts";
import { createContext, ReactNode, useCallback, useContext, useState } from "react";

interface FetchAPIProps {
    dashboard: Dashboard
    financialEvolution: FinancialEvolution[]
    createCategory: (data: CreateCategoryData) => Promise<void>
    createTransaction: (data: CreateTransactionData) => Promise<void>
    fetchCategories: () => Promise<void>
    fetchTransactions: (filters: TransactionFilterData) => Promise<void>
    fetchDashboard: (filters: Pick<TransactionFilterData, 'beginDate' | 'endDate'>
    ) => Promise<void>
    fetchFinancialEvolution: (
        filters: financialEvolutionFilterData
    ) => Promise<void>
    categories: Category[]
    transactions: Transaction[]
}

const FetchAPIContext = createContext<FetchAPIProps>({} as FetchAPIProps)

type FetchAPIProviderProps = {
    children: ReactNode
}

export function FetchAPIProvider({ children }: FetchAPIProviderProps) {
    const [categories, setCategories] = useState<Category[]>([])
    const [transactions, setTransactions] = useState<Transaction[]>([])
    const [dashboard, setDashboard] = useState<Dashboard>({} as Dashboard)
    const [financialEvolution, setFinancialEvolution] = useState<FinancialEvolution[] > ([])



    const createTransaction = useCallback(async (data: CreateTransactionData) => {
        await APIService.createTransaction({
            ...data,
            date: formatDate(data.date),
            amount: Number(data.amount.replace(/[^0-9]/g, ''))

        })
    }, [])

    const createCategory = useCallback(async (data: CreateCategoryData) => {
        await APIService.createCategory(data)
    }, [])

    const fetchCategories = useCallback(async () => {
        const data = await APIService.getCategories()

        setCategories(data)
    }, [])

    const fetchTransactions = useCallback(async (filters: TransactionFilterData) => {
        const transactions = await APIService.getTransactions({
            ...filters,
            beginDate: formatDate(filters.beginDate),
            endDate: formatDate(filters.endDate)
        })

        setTransactions(transactions)
    }, [])

    const fetchDashboard = useCallback(
        async ({
            beginDate,
            endDate
        }: Pick<TransactionFilterData, 'beginDate' | 'endDate'>) => {
            const dashboard = await APIService.getDashboard({
                beginDate: formatDate(beginDate),
                endDate: formatDate(endDate)
            })

            setDashboard(dashboard)
        },
        []
    )

    const fetchFinancialEvolution = useCallback(
        async ({ year }: financialEvolutionFilterData) => {
            const financialEvolution = await APIService.getFinancialEvolution({
                year: year.padStart(4, '0')
            })
            setFinancialEvolution(financialEvolution)
        }, [])

    return (
        <FetchAPIContext.Provider
            value={{
                categories,
                transactions,
                createCategory,
                fetchTransactions,
                fetchCategories,
                createTransaction,
                fetchDashboard,
                dashboard,
                fetchFinancialEvolution,
                financialEvolution
            }}
        >
            {children}
        </FetchAPIContext.Provider>
    )
}

export function useFetchAPI(): FetchAPIProps {
    return useContext(FetchAPIContext)
}
