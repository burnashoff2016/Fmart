import { SOURCE_PAGE_CONTENT, type SourcePageSlug } from "@/lib/source-page-content"

export function SourcePageContent({ slug }: { slug: SourcePageSlug }) {
  return (
    <div
      className="source-content space-y-6 text-[#34383d] dark:text-slate-200 [&_a]:font-bold [&_a]:text-[#111315] [&_a]:underline [&_a]:underline-offset-4 [&_a]:dark:text-[#ffd600] [&_h2]:pt-2 [&_h2]:text-2xl [&_h2]:font-black [&_h2]:text-[#111315] [&_h2]:dark:text-white [&_h3]:text-xl [&_h3]:font-black [&_h3]:text-[#111315] [&_h3]:dark:text-white [&_img]:w-full [&_img]:rounded-3xl [&_img]:border [&_img]:border-border [&_img]:object-cover [&_input]:w-full [&_input]:rounded-2xl [&_input]:border [&_input]:border-border [&_input]:bg-[#f5f6f2] [&_input]:px-4 [&_input]:py-3 [&_input]:dark:bg-white/5 [&_li]:leading-7 [&_li]:text-[#656b72] [&_li]:dark:text-slate-300 [&_p]:leading-8 [&_p]:text-[#656b72] [&_p]:dark:text-slate-300 [&_textarea]:w-full [&_textarea]:rounded-2xl [&_textarea]:border [&_textarea]:border-border [&_textarea]:bg-[#f5f6f2] [&_textarea]:px-4 [&_textarea]:py-3 [&_textarea]:dark:bg-white/5 [&_ul]:space-y-3 [&_ul]:pl-5 [&_ul]:marker:text-[#65707b] [&_ul]:dark:marker:text-[#ffd600]"
      dangerouslySetInnerHTML={{ __html: SOURCE_PAGE_CONTENT[slug] }}
    />
  )
}
