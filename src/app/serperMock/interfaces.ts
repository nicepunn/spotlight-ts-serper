import { z } from 'zod'

export const ListItemSchema = z.object({
  id: z.number(),
  name: z.string(),
  aka: z.string(),
})
export type ListItem = z.infer<typeof ListItemSchema>

export const DateRangeSchema = z.object({
  id: z.number(),
  aka: z.string(),
  name: z.enum([
    'Anytime',
    'Past hour',
    'Past 24 hours',
    'Past week',
    'Past month',
    'Past year',
  ]),
})

export type DateRange = z.infer<typeof DateRangeSchema>

export const ResultsSchema = z.object({
  id: z.number(),
  aka: z.string(),
  name: z.enum(['10', '20', '30', '40', '50', '100']),
})

export type Result = z.infer<typeof ResultsSchema>

export const CodingLanguageSchema = z.object({
  id: z.number(),
  aka: z.string(),
  name: z.enum([
    'C#',
    'cURL',
    'Dart',
    'Go',
    'HTTP',
    'Java',
    'JavaScript',
    'C',
    'NodeJs',
    'Objective-C',
    'OCaml',
    'PHP',
    'PowerShell',
    'Python',
    'R',
    'Ruby',
    'Shell',
    'Swift',
  ]),
})

export type CodingLanguage = z.infer<typeof CodingLanguageSchema>

type IconType = React.ForwardRefExoticComponent<
  Omit<React.SVGProps<SVGSVGElement>, 'ref'> & {
    title?: string | undefined
    titleId?: string | undefined
  } & React.RefAttributes<SVGSVGElement>
>

export const TypeItemSchema = z.object({
  id: z.number(),
  name: z.enum([
    'Search',
    'Images',
    'Videos',
    'Places',
    'Maps',
    'News',
    'Shopping',
    'Scholar',
    'Patents',
    'Autocomplete',
    'Webpage',
  ]),
  icon: z.any(),
})

export type TypeItem = z.infer<typeof TypeItemSchema>

// import { z } from 'zod'

// export const ListItemSchema = z.object({
//   id: z.number(),
//   name: z.string(),
//   aka: z.string(),
// })

// export type ListItem = z.infer<typeof ListItemSchema>

// export const FilterPropsSchema = z.object({
//   Type: z.enum([
//     'Search',
//     'Images',
//     'Videos',
//     'Places',
//     'Maps',
//     'News',
//     'Shopping',
//     'Scholar',
//     'Patents',
//     'Autocomplete',
//     'Webpage',
//   ]),
//   Query: z.string(),
//   Country: z.string(),
//   Location: z.string().nullable(),
//   Language: z.string(),
//   DateRange: DateRangeSchema,
//   Autocorrect: z.boolean(),
//   Results: ResultsSchema,
//   Page: z.number(),
//   MiniBatch: z.boolean(),
//   CodingLanguage: CodingLanguageSchema,
//   Method: ListItemSchema,
// })

// export type FormFilterProps = z.infer<typeof FilterPropsSchema>

export const FilterPropsSchema = z.object({
  Type: TypeItemSchema,
  Query: z.string(),
  Country: z.string(),
  Location: z.string().nullable(),
  Language: z.string(),
  DateRange: z.enum([
    'Anytime',
    'Past hour',
    'Past 24 hours',
    'Past week',
    'Past month',
    'Past year',
  ]),
  Autocorrect: z.boolean(),
  Results: z.enum(['10', '20', '30', '40', '50', '100']),
  Page: z.number(),
  MiniBatch: z.boolean(),
  CodingLanguage: z.enum([
    'C#',
    'cURL',
    'Dart',
    'Go',
    'HTTP',
    'Java',
    'JavaScript',
    'C',
    'NodeJs',
    'Objective-C',
    'OCaml',
    'PHP',
    'PowerShell',
    'Python',
    'R',
    'Ruby',
    'Shell',
    'Swift',
  ]),
  Method: z.string(),
})

export type FormFilterProps = z.infer<typeof FilterPropsSchema>
