import "./CommonBtn.css";

export default function CommonBtn({
    setShowModal,
    stateCommonData
}) {
    const nfts = stateCommonData.nft_collections?.length;
    const poaps = stateCommonData.poaps?.length;

    const handleOnClick = () => {
        setShowModal(true);
    }

    return (
        <>
            {
                (nfts > 0 || poaps > 0) &&
                <button
                    className="common-btn"
                    onClick={handleOnClick}
                >
                    <div>You have</div>
                    {
                        nfts > 0 &&
                        <strong><div>{nfts} {nfts > 1 ? "nft collections" : "nft collection"}</div></strong>
                    }
                    {
                        (nfts > 0 && poaps > 0) &&
                        <div>and</div>
                    }
                    {
                        poaps > 0 &&
                        <strong><div>{poaps} {poaps > 1 ? "poaps" : "poap"}</div></strong>
                    }
                    <div>in common.</div>
                </button>
            }
        </>
    );
}
