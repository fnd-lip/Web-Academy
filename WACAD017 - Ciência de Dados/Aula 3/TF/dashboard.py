import streamlit as st
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import folium
from streamlit_folium import st_folium
from folium.plugins import MarkerCluster

# CONFIGURAÇÃO DO APP
st.set_page_config(
    page_title="Dashboard de Queimadas no Brasil - 2024",
    layout="wide",
    page_icon="🔥"
)

# TÍTULO E DESCRIÇÃO
st.title("🔥 Focos de Queimadas no Brasil - 2024")
st.markdown("""
Este dashboard interativo apresenta uma **análise exploratória dos focos de queimadas detectados no Brasil durante o ano de 2024**.  
Os dados são provenientes do [Programa Queimadas do INPE](https://dataserver-coids.inpe.br/queimadas/queimadas/focos/csv/anual/Brasil_todos_sats/).  
Use os filtros na barra lateral para explorar os focos por estado e visualizar estatísticas detalhadas.
""")

# CARGA DOS DADOS

@st.cache_data
def load_data():
    df = pd.read_csv("focos_br_todos-sats_2024_limpo.csv")

    # normalizar nomes das colunas
    df.columns = df.columns.str.lower().str.strip()

    # corrigir variações nos nomes
    df.rename(columns={
        'riscofogo': 'risco_fogo',
        'diasemchuva': 'dias_sem_chuva'
    }, inplace=True)

    # converter data
    if 'data_pas' in df.columns:
        df['data_pas'] = pd.to_datetime(df['data_pas'], errors='coerce')

    # criar colunas auxiliares
    if 'data_pas' in df.columns:
        df['mes'] = df['data_pas'].dt.month
        df['mes_nome'] = df['data_pas'].dt.month_name(locale='pt_BR')

    return df

df = load_data()

# SIDEBAR - FILTRO
st.sidebar.header("Filtros")
estados = ['Todos os Estados'] + sorted(df['estado'].dropna().unique().tolist())
estado_sel = st.sidebar.selectbox("Selecione o Estado:", estados)

# FILTRAGEM DOS DADOS
if estado_sel == 'Todos os Estados':
    df_filtro = df.copy()
else:
    df_filtro = df[df['estado'] == estado_sel]

# KPIs - MÉTRICAS
total_focos = len(df_filtro)
bioma_mais_afetado = (
    df_filtro['bioma'].mode()[0] if 'bioma' in df_filtro.columns and not df_filtro['bioma'].empty else "N/A"
)
risco_medio = df_filtro['risco_fogo'].mean() if 'risco_fogo' in df_filtro.columns else None

col1, col2, col3 = st.columns(3)
col1.metric("🌎 Total de Focos", f"{total_focos:,}".replace(",", "."))
col2.metric("🌿 Bioma mais afetado", bioma_mais_afetado)
if risco_medio:
    col3.metric("🔥 Risco Médio de Fogo", f"{risco_medio:.2f}")

st.markdown("---")

# MAPA GEOGRÁFICO (FOLIUM)
st.subheader("🗺️ Distribuição Geográfica dos Focos de Queimadas")

if 'latitude' in df_filtro.columns and 'longitude' in df_filtro.columns:
    lat_centro = df_filtro['latitude'].mean()
    lon_centro = df_filtro['longitude'].mean()

    # estilo de mapa base
    m = folium.Map(
        location=[lat_centro, lon_centro],
        zoom_start=5,
        tiles="CartoDB positron",
        control_scale=True
    )

    # agrupamento de pontos para desempenho
    marker_cluster = MarkerCluster().add_to(m)

    # amostra de até 3000 pontos para performance
    sample_size = min(3000, len(df_filtro))
    for _, row in df_filtro.sample(sample_size, random_state=42).iterrows():
        folium.CircleMarker(
            location=[row['latitude'], row['longitude']],
            radius=2.5,
            color='#e60000',  # vermelho mais visível
            fill=True,
            fill_color='#ff4d4d',
            fill_opacity=0.6,
            popup=f"<b>Município:</b> {row['municipio']}<br><b>Bioma:</b> {row['bioma']}"
            if 'municipio' in row and 'bioma' in row else None
        ).add_to(marker_cluster)

    st_folium(m, width=1200, height=600)
else:
    st.warning("Colunas de latitude/longitude não encontradas no dataset.")

# GRÁFICO TEMPORAL
st.subheader("📈 Evolução Mensal dos Focos de Queimadas (2024)")

if 'mes_nome' in df_filtro.columns:
    focos_mes = (
        df_filtro.groupby('mes_nome').size().reindex(
            ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho',
             'Agosto','Setembro','Outubro','Novembro','Dezembro']
        )
    )

    fig, ax = plt.subplots(figsize=(10, 5))

    # Linha principal com marcadores suaves e área sombreada
    ax.plot(
        focos_mes.index,
        focos_mes.values,
        color='#d32f2f',
        linewidth=2.5,
        marker='o',
        markersize=7,
        markerfacecolor='#ff7043',
        markeredgecolor='white'
    )

    # Área sombreada para dar profundidade
    ax.fill_between(focos_mes.index, focos_mes.values, color='#ff7043', alpha=0.15)

    # Etiquetas de valor nos pontos mais altos
    for i, v in enumerate(focos_mes.values):
        ax.text(i, v + (v * 0.03), f"{int(v):,}".replace(",", "."), ha='center', fontsize=8, color='#333')

    # Ajustes visuais
    ax.set_xlabel("Mês", fontsize=11)
    ax.set_ylabel("Número de Focos", fontsize=11)
    ax.set_title(f"Focos Mensais - {estado_sel}", fontsize=13, fontweight='bold', pad=15)
    ax.grid(alpha=0.3, linestyle='--')

    plt.xticks(rotation=45)
    st.pyplot(fig)

else:
    st.warning("A coluna 'data_pas' não foi carregada corretamente para gerar o gráfico temporal.")

st.markdown("---")

# TABELA DE DADOS
st.subheader("📋 Amostra dos Dados Filtrados")

colunas_possiveis = ['data_pas', 'municipio', 'bioma', 'risco_fogo', 'dias_sem_chuva']
colunas_validas = [c for c in colunas_possiveis if c in df_filtro.columns]

if colunas_validas:
    st.dataframe(df_filtro[colunas_validas].head(10))
else:
    st.warning("Nenhuma das colunas esperadas foi encontrada no dataset.")

st.markdown("---")

# GRÁFICO POR BIOMA
st.subheader("🌿 Distribuição de Focos por Bioma")

if 'bioma' in df_filtro.columns:
    focos_bioma = df_filtro['bioma'].value_counts().reset_index()
    focos_bioma.columns = ['Bioma', 'Focos']

    # Paleta de cores distintas (melhor contraste)
    cores = sns.color_palette("Set2", n_colors=len(focos_bioma))

    fig, ax = plt.subplots(figsize=(8, 4))
    barras = sns.barplot(
        x='Focos', y='Bioma',
        data=focos_bioma,
        palette=cores,
        ax=ax
    )

    # Adiciona os valores nas barras
    for i, valor in enumerate(focos_bioma['Focos']):
        ax.text(valor, i, f"{valor:,}".replace(",", "."), va='center', ha='left', fontsize=9)

    # Ajustes visuais
    ax.set_xlabel("Número de Focos", fontsize=10)
    ax.set_ylabel("Bioma", fontsize=10)
    ax.set_title(f"Distribuição de Focos por Bioma - {estado_sel}", fontsize=12, fontweight='bold')
    ax.grid(axis='x', linestyle='--', alpha=0.4)
    st.pyplot(fig)

else:
    st.warning("Coluna 'bioma' não encontrada no dataset.")
st.markdown("---")

# MAPA DE CALOR MÊS x ESTADO

st.subheader("🔥 Mapa de Calor - Focos por Estado e Mês")

if 'estado' in df.columns and 'mes_nome' in df.columns:
    pivot = df.pivot_table(index='estado', columns='mes_nome', values='data_pas', aggfunc='count').fillna(0)
    pivot = pivot.reindex(columns=[
        'Janeiro','Fevereiro','Março','Abril','Maio','Junho',
        'Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'
    ], fill_value=0)

    fig, ax = plt.subplots(figsize=(10, 6))
    sns.heatmap(pivot, cmap='Reds', linewidths=0.5, ax=ax)
    ax.set_xlabel("Mês")
    ax.set_ylabel("Estado")
    ax.set_title("Distribuição Mensal dos Focos de Queimadas por Estado (2024)")
    st.pyplot(fig)
else:
    st.warning("Colunas necessárias para o mapa de calor não encontradas.")

st.markdown("---")

# MUNICÍPIOS COM MAIS FOCOS
st.subheader("🏙️ Municípios com Maior Número de Focos")

if 'municipio' in df_filtro.columns:
    top_municipios = df_filtro['municipio'].value_counts().head(10)

    fig, ax = plt.subplots(figsize=(8, 4))
    sns.barplot(x=top_municipios.values, y=top_municipios.index, palette="OrRd", ax=ax)
    ax.set_xlabel("Número de Focos")
    ax.set_ylabel("Município")
    ax.set_title(f"Top 10 Municípios - {estado_sel}")
    st.pyplot(fig)
else:
    st.warning("Coluna 'municipio' não encontrada no dataset.")

st.markdown("---")
st.markdown("""
💡 **Dashboard desenvolvido por Felipe Barbosa (UFAM - WebAcademy)**  
""")